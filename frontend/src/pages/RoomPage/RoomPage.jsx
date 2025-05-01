import Room3D from "../Room3D/Room3D";
import styles from "./RoomPage.module.scss";

export default function RoomPage() {
  return (
    <div className={styles.roomPage}>
      <h1 className={styles.title}>Giới thiệu phòng học 3D</h1>
      <div className={styles.canvasContainer}>
        <Room3D />
      </div>
    </div>
  );
}
