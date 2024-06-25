import globalMixin from "@/mixins/global";

export default function FreelancerSkill1({ skills }) {
  const { getSkill } = globalMixin();
  return (
    <>
      <div className="sidebar-widget mb30 pb20 bdrs8">
        <h4 className="widget-title">My Skills</h4>
        <div className="tag-list mt30">
          {skills.map((item, i) => (
            <a key={i}>{getSkill(item.name)}</a>
          ))}
        </div>
      </div>
    </>
  );
}
