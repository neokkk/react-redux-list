import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';
import { addInfo } from '../../store';
import './index.scss';

export default function Form({ input }) {
    const [openFlag, setOpenFlag] = useState(false);
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = values => {
        dispatch(addInfo(values));
        setOpenFlag(!openFlag);
    }

    return (
        <div className="Form">
            <button type="button" className="Form_trigger" onClick={() => setOpenFlag(!openFlag)}>
                <AddIcon />
            </button>

            {openFlag &&
            <>
                <form className="Form_box" onSubmit={handleSubmit(onSubmit)}>
                    {input.map((info, idx) => (
                        <div className="Form_row" key={`form_row_${idx}`}>
                            <label>{info.name}</label>
                            <input type={info.type} name={info.key} defaultValue="" ref={register(info.options)} />
                            {errors[info.key] && (errors[info.key]?.type === 'required'
                                ? <span className="Form_error">This field is required.</span>
                                : <span className="Form_error">This field is invalid.</span>
                            )}
                        </div>
                    ))}

                    <div className="Form_btn_wrap">
                        <button type="button" onClick={() => setOpenFlag(!openFlag)}>Cancel</button>
                        <button type="submit" className="Form_btn_save">Save</button>
                    </div>
                </form>

                <div className="Form_background"></div>
            </>
            }
        </div>
    );
}