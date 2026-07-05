import './ProjectCard.css';

interface ProjectCardProps {
  initials: string;
  category: string;
  title: string;
  color: string;
  onClick?: () => void;
}

const ProjectCard = ({ initials, category, title, color, onClick }: ProjectCardProps) => {
  return (
    <div className="project-card" style={{ '--card-color': color } as React.CSSProperties} onClick={onClick}>
      <div className="project-card__top-border"></div>
      <div className="project-card__content">
        <div className="project-card__initials-box">
          {initials}
        </div>
        <div className="project-card__category">{category}</div>
        <div className="project-card__title">{title}</div>
        <div className="project-card__details">
          DETAILS →
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
