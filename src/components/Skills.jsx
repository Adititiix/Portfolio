import { useMemo, useState } from 'react';
import { CornerDownRight } from 'lucide-react';
import { SKILL_GROUPS } from '../data/content.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import SkillLogo from './SkillLogo.jsx';

export default function Skills() {
  const [selected, setSelected] = useState({ group: 'languages', name: 'Python' });

  const detail = useMemo(() => {
    const group = SKILL_GROUPS.find((g) => g.id === selected.group);
    const skill = group?.skills.find((s) => s.name === selected.name);
    return skill ? { group, skill } : null;
  }, [selected]);

  return (
    <section id="skills" className="section section--tint" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills-title"
          index="02"
          eyebrow="Toolkit"
          title="Skills"
          intro="Technologies, techniques, and core concepts grouped by area. Select any tile to see where it was used."
        />

        <div className="skills">
          <div className="skills__groups">
            {SKILL_GROUPS.map((group, i) => (
              <Reveal
                key={group.id}
                className={`skill-group ${group.concepts ? 'skill-group--concepts' : ''}`}
                delay={i * 40}
              >
                <h3 className="skill-group__label mono" id={`skill-group-${group.id}`}>
                  {group.label}
                  <span className="skill-group__count">{String(group.skills.length).padStart(2, '0')}</span>
                </h3>
                <ul
                  className="skill-grid"
                  aria-labelledby={`skill-group-${group.id}`}
                  style={{ '--count': group.skills.length }}
                >
                  {group.skills.map((skill) => {
                    const isActive = selected.group === group.id && selected.name === skill.name;
                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          className={`skill-tile ${isActive ? 'is-active' : ''}`}
                          aria-pressed={isActive}
                          aria-controls="skill-detail"
                          onClick={() => setSelected({ group: group.id, name: skill.name })}
                        >
                          <span className="skill-tile__logo">
                            <SkillLogo logo={skill.logo} name={skill.name} />
                          </span>
                          <span className="skill-tile__label">{skill.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal as="aside" className="skill-detail" delay={120}>
            <div id="skill-detail" aria-live="polite">
              {detail && (
                <>
                  <div className="skill-detail__head">
                    <span className="skill-detail__logo">
                      <SkillLogo logo={detail.skill.logo} name={detail.skill.name} />
                    </span>
                    <div>
                      <p className="mono skill-detail__kicker">{detail.group.label}</p>
                      <p className="skill-detail__name">{detail.skill.name}</p>
                    </div>
                  </div>
                  {detail.group.concepts ? (
                    <p className="skill-detail__empty">A core computer science concept.</p>
                  ) : (
                    <>
                      <p className="skill-detail__label mono">Used in</p>
                      {detail.skill.usedIn.length > 0 ? (
                        <ul className="skill-detail__list">
                          {detail.skill.usedIn.map((place) => (
                            <li key={place}>
                              <CornerDownRight size={16} strokeWidth={1.75} aria-hidden="true" />
                              {place}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="skill-detail__empty">Not yet featured in a project on this page.</p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
