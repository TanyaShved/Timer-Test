import s from "./Timer.module.css";

const Timer = ({ mSeconds }) => {
    return (
        <div className={s.timer}>
            {new Date(mSeconds).toISOString().slice(11, 19)}
        </div>
    )

}

export default Timer;