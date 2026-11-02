import Image from 'next/image';
import styles from '../../styles/MarketingOpportunities.module.css';

export const marketingRoles = [
  {
    id: 'social-media',
    title: 'Social Media Marketing Manager',
    category: 'Social & community',
    description: 'Shape social strategy, develop campaigns, and build an engaged community across digital channels.',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Manager',
    category: 'Campaigns & performance',
    description: 'Connect paid media, audience insights, and campaign measurement to drive meaningful results.',
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing Specialist',
    category: 'Content & storytelling',
    description: 'Turn ideas into compelling stories, editorial plans, and content that connects with the right audience.',
  },
  {
    id: 'brand-marketing',
    title: 'Brand Marketing Specialist',
    category: 'Brand & creative',
    description: 'Bring brand positioning to life through creative briefs, coordinated campaigns, and consistent messaging.',
  },
];

export default function MarketingOpportunities({ selectedRole, onSelect, interviewerName, disabled }) {
  return (
    <div className={styles.opportunities}>
      <div className={styles.intro}>
        <p>Choose the marketing role you’d like to discuss, then pick a time for a conversation about your experience and ideas.</p>
        <div className={styles.host}>
          <span className={styles.avatar}>
            <Image src="/assets/images/fabian-stoehr.jpg" alt="" width={44} height={44} />
          </span>
          <div><span>Your interviewer</span><strong>{interviewerName}</strong></div>
          <span className={styles.duration}>30-minute phone conversation</span>
        </div>
      </div>

      <fieldset className={styles.roles} disabled={disabled}>
        <legend className={styles.legend}>Which role interests you?</legend>
        <div className={styles.grid}>
          {marketingRoles.map((role) => (
            <label key={role.id} className={styles.roleCard}>
              <input type="radio" name="interview-role" value={role.id} checked={selectedRole.id === role.id}
                onChange={() => onSelect(role)} aria-labelledby={`role-${role.id}-title`} aria-describedby={`role-${role.id}-description`} />
              <span className={styles.cardBody}>
                <span className={styles.category}>{role.category}</span>
                <span id={`role-${role.id}-title`} className={styles.roleTitle}>{role.title}</span>
                <span id={`role-${role.id}-description`} className={styles.description}>{role.description}</span>
                <span className={styles.selection}>{selectedRole.id === role.id ? 'Selected for your conversation' : 'Discuss this role'}<span aria-hidden="true">{selectedRole.id === role.id ? '✓' : '+'}</span></span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.actions}>
        <p aria-live="polite">Your conversation: <strong>{selectedRole.title}</strong></p>
        <a className={styles.scheduleLink} href="#interview-scheduling">Choose an interview time <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  );
}
