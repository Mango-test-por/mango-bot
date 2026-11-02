import Image from 'next/image';
import styles from '../../styles/CompletionScreen.module.css';

const careersUrl = 'https://www.porsche.com/international/aboutporsche/jobs/';
const nextSteps = [
  { icon: 'calendar', title: 'Make time for the conversation.', description: 'Save your interview date and time in your calendar. Refer to your invitation for the time zone and contact details.' },
  { icon: 'portfolio', title: 'Bring your experience to life.', description: 'Choose a few campaigns or projects that show your approach, your contribution, and the results you achieved.' },
  { icon: 'conversation', title: 'Come curious. Come prepared.', description: 'Find a quiet place for your call, check your phone connection, and bring the questions that matter to you.' },
];

function Icon({ name, className }) {
  const paths = {
    check: 'M5 12l4 4L19 6',
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    calendar: 'M8 3v4m8-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z',
    portfolio: 'M8 6V3h8v3M3 7h18v13H3V7Zm0 5h18M10 12v3h4v-3',
    conversation: 'M4 4h16v12H9l-5 4V4Zm4 4h8m-8 4h5',
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function CompletionScreen({ meeting = {} }) {
  const { meeting_date: date, meeting_time: time, meeting_title: title } = meeting || {};
  const hasSchedule = Boolean(date && time);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href={careersUrl} aria-label="Porsche careers">
          <Image src="/porsche-wordmark.svg" alt="Porsche" width={240} height={16} priority unoptimized />
        </a>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="completion-title">
          <div className={styles.heroContent}>
            <span className={styles.successIcon}><Icon name="check" /></span>
            <p className={styles.eyebrow}>Your next chapter</p>
            <h1 id="completion-title">{hasSchedule ? 'Your interview is confirmed.' : 'Thank you. You’re all set.'}</h1>
            <p className={styles.intro}>A conversation about your experience, your ideas, and what drives you. We look forward to speaking with you.</p>
          </div>
        </section>

        <section className={styles.summary} aria-labelledby="interview-details-title">
          <div className={styles.summaryHeader}>
            <h2 id="interview-details-title">Your interview details</h2>
            {hasSchedule && <span className={styles.badge}><Icon name="check" /> Scheduled</span>}
          </div>
          <p className={styles.meetingTitle}>{title || 'Your career conversation'}</p>
          <dl className={styles.details}>
            <div><dt>Date</dt><dd>{date || 'See your interview invitation'}</dd></div>
            <div><dt>Time</dt><dd>{time || 'See your interview invitation'}</dd></div>
            <div><dt>Format</dt><dd>30-minute phone conversation</dd></div>
          </dl>
          <p className={styles.scheduleNote}>Please check your invitation for the time zone. To make a change, contact the person who invited you.</p>
        </section>

        <section className={styles.preparation} aria-labelledby="next-steps-title">
          <p className={styles.eyebrow}>Make the most of your interview</p>
          <h2 id="next-steps-title">Ready for the conversation.</h2>
          <ol className={styles.steps}>
            {nextSteps.map((step) => (
              <li key={step.icon} className={styles.step}>
                <span className={styles.stepIcon}><Icon name={step.icon} /></span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <div className={styles.actions}>
            <a className={styles.primaryLink} href={`${careersUrl}application/`}>Interview & application advice <Icon name="arrow" /></a>
            <a className={styles.secondaryLink} href={careersUrl}>Explore careers at Porsche <Icon name="arrow" /></a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Careers at Porsche</p>
        <span>Driven by people. Inspired by possibilities.</span>
      </footer>
    </div>
  );
}
