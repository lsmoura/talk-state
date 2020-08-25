import React, { useCallback, useState } from 'react';
import { NoteType } from './Note';

type EditNoteModalProps = {
  note: NoteType,
  onUpdate: (NoteType) => void,
  onClose: () => void,
};
const EditNoteModal = ({ note, onUpdate, onClose }: EditNoteModalProps) => {
  const [contents, setContents] = useState(note.contents);

  const onChangeContents = useCallback(
    (event) => {
      setContents(event.target.value);
    },
    [setContents],
  );

  const handleSave = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!contents || contents.length <= 0) return;

    onUpdate({ contents });
  }, [contents, onUpdate]);
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <div style={{
        maxWidth: '400px',
        margin: '1em auto',
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '.5em',
      }}>
        <form onSubmit={handleSave}>
          <h2 style={{ margin: 0, padding: 0 }}>Edit Note</h2>
          <div>
            <textarea name={'contents'} value={contents} onChange={onChangeContents}/>
          </div>
          <div>
            <input type={'submit'} value={'save'} onClick={handleSave}/>
            <button onClick={onClose}>close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;