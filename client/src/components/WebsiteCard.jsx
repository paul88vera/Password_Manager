const WebsiteCard = ({ id, title, favIcon }) => {
  return (
    <div className="site-card" key={id}>
      <img src={favIcon} alt={title} />
      <h3>{title}title</h3>
    </div>
  );
};

export default WebsiteCard;
