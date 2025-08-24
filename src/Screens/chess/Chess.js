import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

// Initial board setup
const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

const whitePieces = "♔♕♖♗♘♙";
const blackPieces = "♚♛♜♝♞♟";

const isWhitePiece = (piece) => piece !== "" && whitePieces.includes(piece);
const isBlackPiece = (piece) => piece !== "" && blackPieces.includes(piece);
const isSameColor = (piece1, piece2) =>
  (isWhitePiece(piece1) && isWhitePiece(piece2)) ||
  (isBlackPiece(piece1) && isBlackPiece(piece2));

const findKing = (board, isWhiteTurn) => {
  const kingPiece = isWhiteTurn ? "♔" : "♚";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === kingPiece) return [r, c];
    }
  }
  return null;
};

export default function Chess() {
  const [board, setBoard] = useState(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [message, setMessage] = useState("White's turn to move.");
  const [isGameOver, setIsGameOver] = useState(false);
  const [enPassantTarget, setEnPassantTarget] = useState(null);

  // ----------------- Utility -----------------
  const isCurrentPlayerPiece = (piece, isCurrentWhiteTurn) =>
    (isCurrentWhiteTurn && isWhitePiece(piece)) ||
    (!isCurrentWhiteTurn && isBlackPiece(piece));

  const simulateMove = (currentBoard, start, end) => {
    const newBoard = JSON.parse(JSON.stringify(currentBoard));
    newBoard[end[0]][end[1]] = newBoard[start[0]][start[1]];
    newBoard[start[0]][start[1]] = "";
    return newBoard;
  };

  const isKingInCheck = (currentBoard, isCurrentWhiteTurn) => {
    const kingPos = findKing(currentBoard, isCurrentWhiteTurn);
    if (!kingPos) return false;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = currentBoard[r][c];
        if (
          piece !== "" &&
          !isSameColor(piece, currentBoard[kingPos[0]][kingPos[1]])
        ) {
          if (
            isValidMove(
              currentBoard,
              [r, c],
              kingPos,
              !isCurrentWhiteTurn,
              true
            )
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // ----------------- Move Validation -----------------
  const isValidMove = (
    board,
    start,
    end,
    isCurrentWhiteTurn,
    isForCheckCheck = false
  ) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const piece = board[startRow][startCol];
    const targetPiece = board[endRow][endCol];

    if (!piece || isSameColor(piece, targetPiece)) return false;
    if (
      (isCurrentWhiteTurn && isBlackPiece(piece)) ||
      (!isCurrentWhiteTurn && isWhitePiece(piece))
    ) {
      return false;
    }

    let isMoveValid = false;

    switch (piece) {
      case "♟": // Black Pawn
        if (!isCurrentWhiteTurn) {
          if (startRow + 1 === endRow && startCol === endCol && !targetPiece)
            isMoveValid = true;
          if (
            startRow === 1 &&
            endRow === 3 &&
            startCol === endCol &&
            !board[2][startCol] &&
            !targetPiece
          )
            isMoveValid = true;
          if (
            startRow + 1 === endRow &&
            Math.abs(startCol - endCol) === 1 &&
            isWhitePiece(targetPiece)
          )
            isMoveValid = true;
          if (
            enPassantTarget &&
            endRow === 5 &&
            endCol === enPassantTarget[1] &&
            startRow === 4 &&
            Math.abs(startCol - endCol) === 1
          )
            isMoveValid = true;
        }
        break;
      case "♙": // White Pawn
        if (isCurrentWhiteTurn) {
          if (startRow - 1 === endRow && startCol === endCol && !targetPiece)
            isMoveValid = true;
          if (
            startRow === 6 &&
            endRow === 4 &&
            startCol === endCol &&
            !board[5][startCol] &&
            !targetPiece
          )
            isMoveValid = true;
          if (
            startRow - 1 === endRow &&
            Math.abs(startCol - endCol) === 1 &&
            isBlackPiece(targetPiece)
          )
            isMoveValid = true;
          if (
            enPassantTarget &&
            endRow === 2 &&
            endCol === enPassantTarget[1] &&
            startRow === 3 &&
            Math.abs(startCol - endCol) === 1
          )
            isMoveValid = true;
        }
        break;
      case "♖":
      case "♜":
        if (startRow === endRow) {
          const step = endCol > startCol ? 1 : -1;
          for (let c = startCol + step; c !== endCol; c += step)
            if (board[startRow][c]) return false;
          isMoveValid = true;
        } else if (startCol === endCol) {
          const step = endRow > startRow ? 1 : -1;
          for (let r = startRow + step; r !== endRow; r += step)
            if (board[r][startCol]) return false;
          isMoveValid = true;
        }
        break;
      case "♘":
      case "♞":
        const dx = Math.abs(startCol - endCol);
        const dy = Math.abs(startRow - endRow);
        isMoveValid = (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
        break;
      case "♗":
      case "♝":
        if (Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) {
          const rowStep = endRow > startRow ? 1 : -1;
          const colStep = endCol > startCol ? 1 : -1;
          for (let i = 1; i < Math.abs(startRow - endRow); i++) {
            if (board[startRow + i * rowStep][startCol + i * colStep])
              return false;
          }
          isMoveValid = true;
        }
        break;
      case "♕":
      case "♛":
        const isStraight = startRow === endRow || startCol === endCol;
        const isDiagonal =
          Math.abs(startRow - endRow) === Math.abs(startCol - endCol);
        if (isStraight) {
          if (startRow === endRow) {
            const step = endCol > startCol ? 1 : -1;
            for (let c = startCol + step; c !== endCol; c += step)
              if (board[startRow][c]) return false;
          } else {
            const step = endRow > startRow ? 1 : -1;
            for (let r = startRow + step; r !== endRow; r += step)
              if (board[r][startCol]) return false;
          }
          isMoveValid = true;
        } else if (isDiagonal) {
          const rowStep = endRow > startRow ? 1 : -1;
          const colStep = endCol > startCol ? 1 : -1;
          for (let i = 1; i < Math.abs(startRow - endRow); i++) {
            if (board[startRow + i * rowStep][startCol + i * colStep])
              return false;
          }
          isMoveValid = true;
        }
        break;
      case "♔":
      case "♚":
        const rowDiff = Math.abs(startRow - endRow);
        const colDiff = Math.abs(startCol - endCol);
        isMoveValid = rowDiff <= 1 && colDiff <= 1;
        break;
      default:
        return false;
    }

    if (isMoveValid && !isForCheckCheck) {
      const nextBoard = simulateMove(board, start, end);
      if (isKingInCheck(nextBoard, isCurrentWhiteTurn)) {
        setMessage("Invalid: leaves king in check!");
        return false;
      }
    }
    return isMoveValid;
  };

  // ----------------- Handle Moves -----------------
  const handleSquareClick = (row, col) => {
    if (isGameOver) {
      setMessage("Game over. Reset to play again.");
      return;
    }

    const clickedPiece = board[row][col];
    const clickedSquare = [row, col];

    if (selectedSquare) {
      const [startRow, startCol] = selectedSquare;
      const startPiece = board[startRow][startCol];

      if (isSameColor(startPiece, clickedPiece)) {
        setSelectedSquare(clickedSquare);
        setMessage(`Selected ${clickedPiece} at (${row + 1}, ${col + 1})`);
        return;
      }

      if (isValidMove(board, selectedSquare, clickedSquare, isWhiteTurn)) {
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = newBoard[startRow][startCol];
        newBoard[startRow][startCol] = "";
        setBoard(newBoard);
        setIsWhiteTurn(!isWhiteTurn);
        setSelectedSquare(null);
        setMessage(isWhiteTurn ? "Black's turn" : "White's turn");
      } else {
        setMessage("Invalid move.");
        setSelectedSquare(null);
      }
    } else {
      if (
        clickedPiece !== "" &&
        isCurrentPlayerPiece(clickedPiece, isWhiteTurn)
      ) {
        setSelectedSquare(clickedSquare);
        setMessage(`Selected ${clickedPiece} at (${row + 1}, ${col + 1})`);
      } else {
        setMessage("Pick your own piece.");
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedSquare(null);
    setIsWhiteTurn(true);
    setMessage("Game Reset! White's turn.");
    setIsGameOver(false);
    setEnPassantTarget(null);
  };

  // ----------------- UI -----------------
  const renderBoard = () =>
    board.map((row, rowIndex) => (
      <Box key={rowIndex} display="flex">
        {row.map((piece, colIndex) => {
          const isSelected =
            selectedSquare &&
            selectedSquare[0] === rowIndex &&
            selectedSquare[1] === colIndex;
          const isEvenSquare = (rowIndex + colIndex) % 2 === 0;
          return (
            <Paper
              key={colIndex}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
              sx={{
                width: { xs: 48, md: 64 },
                height: { xs: 48, md: 64 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                backgroundColor: isEvenSquare ? "#fef3c7" : "#92400e",
                color: isEvenSquare ? "black" : "white",
                border: isSelected ? "3px solid #2196f3" : "1px solid #333",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": { opacity: 0.9 },
              }}
            >
              {piece}
            </Paper>
          );
        })}
      </Box>
    ));

  return (
    <Box
      minHeight="100vh"
      bgcolor="grey.900"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Chess Game
      </Typography>

      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>

      <Box
        sx={{
          border: "4px solid #333",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 6,
        }}
      >
        {renderBoard()}
      </Box>

      <Button
        onClick={resetGame}
        variant="contained"
        color="error"
        size="large"
        sx={{ mt: 3 }}
      >
        Reset Game
      </Button>
    </Box>
  );
}
