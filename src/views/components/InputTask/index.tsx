import React, { useState, useRef, useEffect } from 'react'
import styles from './index.module.scss';

interface InputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, value: string) => void;
    onRemoved: (id: string) => void;
}

const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {
    const [checked, setChecked] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus()
        }
    }, [isEditMode])

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    checked={checked}
                    className={styles.inputTaskCheckbox}
                    disabled={isEditMode}
                    onChange={(event) => {
                        setChecked(event.target.checked)

                        if (event.target.checked) {
                            setTimeout(() => {
                                onDone(id)
                            }, 200)
                        }
                    }}
                />
                {isEditMode ?
                    (<input
                        type='text'
                        ref={editTitleInputRef}
                        value={value}
                        onChange={(evt) => setValue(evt.target.value)}
                        className={styles.inputTaskTitleEdit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onEdited(id, value)
                                setIsEditMode(false)
                            }
                        }}
                    />) :
                    <h3 className={styles.inputTaskTitle}>{title}</h3>}
            </label>
            {isEditMode ? <button
                aria-label='Save'
                className={styles.inputTaskSave}
                onClick={() => {
                    onEdited(id, value)
                    setIsEditMode(false)
                }}
            /> : <button
                aria-label='Edit'
                className={styles.inputTaskEdit}
                onClick={() => {
                    setIsEditMode(true)
                }}
            />}
            <button
                aria-label='Remove'
                className={styles.inputTaskRemove}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemoved(id)
                    }
                }}
            />
        </div>
    )
}

export default InputTask