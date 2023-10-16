interface Props {
  isShowNotification: boolean;
}

const Notification = ({ isShowNotification }: Props) => (
  <div className={`notification-container ${isShowNotification ? "show" : ""}`}>
    <p>You have already entered this letter</p>
  </div>
);

export default Notification;
