


import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

function EditPassword(props) {



    const [passWarn, setPassWarn] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({});

    const sendPass = (e) => {
        if (e.passwordNew !== e.passwordNew2) {
            setPassWarn(true)
        } else {
            setPassWarn(false)
            props.sendPass(e.passwordPre ,e.passwordNew ,e.passwordNew2  )
        }

    }
    return (
        <div>
            <form className="EditFrom" onSubmit={handleSubmit(sendPass)}>
                <div className="row">
                    <div className="col-md-12 col-12 text-right">
                        <input
                            type="password"
                            placeholder="رمز عبور پیشین"
                            name="passwordPre"
                            className="inputsformPass"
                            id="passwordPre"
                            {...register('passwordPre', {
                                required: 'رمز عبور پیشین خود را وارد کنید',
                            })}
                        />
                        {errors.passwordPre && (
                            <p style={{ color: 'red' }}>
                                {errors.passwordPre.message}
                            </p>
                        )}
                    </div>
                    <div className="col-md-12 col-12 text-right">
                        <input
                            type="password"
                            placeholder="رمز عبور جدید"
                            name="passwordNew"
                            className="inputsformPass"
                            id="passwordNew"
                            {...register('passwordNew', {
                                required: 'رمز عبور پیشین خود را وارد کنید',
                            })}


                        />
                        {errors.passwordNew && (
                            <p style={{ color: 'red' }}>
                                {errors.passwordNew.message}
                            </p>
                        )}
                    </div>
                    <div className="col-md-12 col-12 text-right">
                        <input
                            type="password"
                            placeholder="تکرار رمز عبور جدید"
                            name="passwordNew2"
                            className="inputsformPass"
                            id="passwordNew2"
                            {...register('passwordNew2', {
                                required: 'رمز عبور پیشین خود را وارد کنید',
                            })}
                        />
                        {errors.passwordNew2 && (
                            <p style={{ color: 'red' }}>
                                {errors.passwordNew2.message}
                            </p>
                        )}
                        {passWarn? (
                            <p style={{ color: 'red' }}>
                                رمزعبور شما مطابقت ندارد
                            </p>
                        ) : <></>}
                    </div>
                    <div className="col-md-12 col-12 text-center">
                        <input
                            type="submit"
                            id="Submitbtn"
                            value="ارسال"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPassword
