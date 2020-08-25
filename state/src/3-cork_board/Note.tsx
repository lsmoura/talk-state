import React, { useCallback, useEffect, useState } from 'react';

export type NoteType = {
  id: string,
  x: number,
  y: number,
  contents: string,
  color?: string,
};

type NoteProps = {
  note: NoteType,
  updateNote?: (NoteType) => void,
  startEditing?: (event) => void,
  deleteNote?: (event) => void,
};

const Note = ({ note, updateNote, startEditing, deleteNote }: NoteProps) => {
  const { id, x, y, contents, color = 'yellow' } = note;
  const [position, setPosition] = useState<{ x: number, y: number }>({ x, y });
  const [isMoving, setIsMoving] = useState(false);

  const handleMouseMove = useCallback((event) => {
    if (!isMoving) return;
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }, [isMoving, setPosition]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (!updateNote) return;
    if (isMoving) return;
    if (x === position.x && y === position.y) return;

    updateNote({
      id,
      x: position.x,
      y: position.y,
    });
  }, [position, isMoving, updateNote]);

  const handleOnMouseDown = useCallback(() => {
    setIsMoving(true);
    const eventListener = () => {
      setIsMoving(false);
      document.removeEventListener('mouseup', eventListener);
    };
    document.addEventListener('mouseup', eventListener);
  }, [setIsMoving]);

  return (
    <div onMouseDown={handleOnMouseDown} style={{
      background: color,
      border: `1px solid ${color}`,
      left: position.x,
      padding: '1em 0.2em 0.2em 0.2em',
      position: 'absolute',
      top: position.y,
    }}>
      <div>{contents}</div>
      <div>
        {startEditing
          ? <button onClick={startEditing} data-noteid={note.id}>edit</button>
          : null
        }
        {deleteNote
          ? <button onClick={deleteNote} data-noteid={note.id}>delete</button>
          : null
        }
      </div>
    </div>
  );
};

export default Note;
