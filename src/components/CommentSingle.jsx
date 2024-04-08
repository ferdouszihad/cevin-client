import Robo from "../assets/robot.gif";
const CommentSingle = (props = {}) => {
  const { comment } = props || {};
  const date = new Date(comment?.time);
  //console.log(comment);
  return (
    <div className="border-b-2 border-t-2">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={comment?.image}
            />
          </div>
        </div>
        <div className="chat-header">{comment?.name}</div>
        <div className="chat-bubble">{comment?.comment}</div>
        <div className="chat-footer opacity-50">{date.toLocaleString()}</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={Robo} />
          </div>
        </div>
        <div className="chat-header">Cevin.AI</div>
        <div className="chat-bubble">
          {comment?.reply.length == 0
            ? "cevin did not said anything"
            : comment?.reply}
        </div>
        <div className="chat-footer opacity-50">{date.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default CommentSingle;
