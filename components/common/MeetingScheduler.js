import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LoadingSpinner from "../ui/LoadingSpinner";
import styles from "../../styles/MeetingScheduler.module.css";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getTimeSlots(date, now) {
  if (!date || !now || [0, 6].includes(date.getDay())) return [];
  const slots = [];
  for (let minutes = 9 * 60; minutes <= 17 * 60; minutes += 30) {
    const slot = new Date(date);
    slot.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
    if (slot > now) {
      slots.push(`${String(slot.getHours()).padStart(2, "0")}:${String(slot.getMinutes()).padStart(2, "0")}`);
    }
  }
  return slots;
}

function Icon({ type, ...props }) {
  const paths = {
    calendar: "M8 3v4m8-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z",
    clock: "M12 8v4l3 2",
    phone: "m7 3 3 5-3 2a14 14 0 0 0 7 7l2-3 5 3-2 4C10 21 3 14 3 5l4-2Z",
    arrow: "m9 5 7 7-7 7",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {type === "clock" && <circle cx="12" cy="12" r="9" />}
      <path d={paths[type]} />
    </svg>
  );
}

function MeetingScheduler({ NextStep, FacebookLogo, isLoading, captchaVerified = true, roleTitle = "Social Media Marketing Manager", interviewerName = "Fabian Stöhr" }) {
  const [now, setNow] = useState(null);
  const [viewDate, setViewDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState("time");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectionError, setSelectionError] = useState("");
  const reviewHeading = useRef(null);
  const continueButton = useRef(null);
  const phoneInput = useRef(null);

  useEffect(() => {
    const current = new Date();
    setNow(current);
    // Start on the next day with time options, including across month boundaries.
    const firstDate = new Date(current);
    firstDate.setHours(0, 0, 0, 0);
    while (!getTimeSlots(firstDate, current).length) firstDate.setDate(firstDate.getDate() + 1);
    setViewDate(new Date(firstDate.getFullYear(), firstDate.getMonth(), 1));
    setSelectedDate(firstDate);
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step === "details") reviewHeading.current?.focus();
  }, [step]);

  const year = viewDate?.getFullYear();
  const month = viewDate?.getMonth();
  const cells = viewDate ? [
    ...Array((viewDate.getDay() + 6) % 7).fill(null),
    ...Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1),
  ] : [];
  const timeSlots = getTimeSlots(selectedDate, now);
  const selectionValid = !!selectedTime && timeSlots.includes(selectedTime);
  const canGoPrev = now && viewDate > new Date(now.getFullYear(), now.getMonth(), 1);
  const formattedDate = selectedDate?.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
  const timezone = now ? Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ") : "Your local time";
  const offset = selectedDate ? new Intl.DateTimeFormat("en", { timeZoneName: "shortOffset" })
    .formatToParts(selectedDate).find((part) => part.type === "timeZoneName")?.value : "";

  const handleDaySelect = (day) => {
    setSelectedDate(new Date(year, month, day));
    setSelectedTime(null);
    setSelectionError("");
  };

  const handleBack = () => {
    setStep("time");
    setTimeout(() => continueButton.current?.focus(), 0);
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    if (isLoading || !captchaVerified) return;
    if (!getTimeSlots(selectedDate, new Date()).includes(selectedTime)) {
      setSelectionError("That time has passed. Please choose another time.");
      setSelectedTime(null);
      handleBack();
      return;
    }
    const phone = phoneNumber.trim();
    const digits = phone.replace(/\D/g, "");
    if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
      setPhoneError("Enter a valid phone number, including your country code.");
      phoneInput.current?.focus();
      return;
    }
    setPhoneError("");
    NextStep("User selected a meeting time and clicked confirm with Facebook", {
      phone_number: phone,
      meeting_date: formattedDate,
      meeting_time: selectedTime,
      meeting_title: `${roleTitle} interview`,
    });
  };

  return (
    <section className={styles.scheduler} aria-labelledby="meeting-title">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>LET’S FIND A TIME</p>
        <h2 id="meeting-title">Set up your interview.</h2>
        <p>Choose a time that works for you. We’ll take it from there.</p>
      </header>

      <div className={styles.card}>
        <a className={styles.calendlyBadge} href="https://calendly.com" target="_blank" rel="noopener noreferrer" aria-label="Powered by Calendly (opens in a new tab)">
          <span>Powered by</span>
          <strong>Calendly</strong>
        </a>
        <aside className={styles.overview} aria-label="Interview details">
          <div className={styles.interviewer}>
            <span className={styles.interviewerAvatar}>
              <Image src="/assets/images/fabian-stoehr.jpg" alt="" width={64} height={64} />
            </span>
            <div><span>Your interviewer</span><strong>{interviewerName}</strong></div>
          </div>
          <h3>{roleTitle}</h3>
          <ul className={styles.facts}>
            <li><Icon type="clock" /><span>30 minutes</span></li>
            <li><Icon type="phone" /><span>Phone interview</span></li>
          </ul>
          <p className={styles.description}>Let’s talk about your experience, your ideas, and the role. Choose a time that works best for you.</p>
          {selectionValid && (
            <div className={styles.sidebarSelection}>
              <Icon type="calendar" />
              <div><strong>{formattedDate}</strong><span>{selectedTime} · {timezone}</span></div>
            </div>
          )}
          <div className={styles.overviewNote}>
            <span className={styles.noteLabel}>A little preparation goes a long way.</span>
            <p>Bring your questions and a few examples of work you’re proud of.</p>
          </div>
        </aside>

        <div className={styles.main}>
          <ol className={styles.steps} aria-label="Meeting setup progress">
            <li aria-current={step === "time" ? "step" : undefined} className={styles.activeStep}>
              <span>{step === "details" ? <Icon type="check" /> : "1"}</span>Date &amp; time
            </li>
            <li className={step === "details" ? styles.activeStep : ""} aria-current={step === "details" ? "step" : undefined}>
              <span>2</span>Your details
            </li>
          </ol>

          {step === "time" ? (
            <>
              <div className={styles.sectionHeading}>
                <h3>Select a Date &amp; Time</h3>
                <p>Pick your preferred date and a 30-minute time slot.</p>
              </div>
              <div className={styles.picker} aria-busy={!now}>
                <div className={styles.calendar}>
                  <div className={styles.monthNav}>
                    <h4 aria-live="polite">{viewDate ? viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Loading calendar…"}</h4>
                    <div>
                      <button type="button" disabled={!canGoPrev} onClick={() => setViewDate(new Date(year, month - 1, 1))} aria-label="Previous month"><Icon type="arrow" className={styles.previous} /></button>
                      <button type="button" disabled={!viewDate} onClick={() => setViewDate(new Date(year, month + 1, 1))} aria-label="Next month"><Icon type="arrow" /></button>
                    </div>
                  </div>
                  <div className={styles.weekdays} aria-hidden="true">{WEEKDAYS.map((day) => <span key={day}>{day}</span>)}</div>
                  <div className={styles.days}>
                    {cells.map((day, index) => {
                      if (!day) return <span key={`empty-${index}`} />;
                      const date = new Date(year, month, day);
                      const selected = selectedDate?.toDateString() === date.toDateString();
                      return (
                        <button key={day} type="button" disabled={!getTimeSlots(date, now).length}
                          aria-label={date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                          aria-pressed={selected} aria-current={date.toDateString() === now?.toDateString() ? "date" : undefined}
                          onClick={() => handleDaySelect(day)}>{day}</button>
                      );
                    })}
                  </div>
                  <p className={styles.calendarHint}>Monday – Friday</p>
                </div>
                <div className={styles.times}>
                  <h4 id="meeting-times-label" aria-live="polite">{selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "Choose a date"}</h4>
                  <div className={styles.timeGrid} role="group" aria-labelledby="meeting-times-label">
                    {timeSlots.map((time) => (
                      <button type="button" key={time} aria-pressed={selectedTime === time} onClick={() => { setSelectedTime(time); setSelectionError(""); }}>{time}</button>
                    ))}
                  </div>
                  {selectedDate && !timeSlots.length && <p className={styles.emptyState}>No times left on this day. Choose another date to continue.</p>}
                </div>
              </div>
              <p className={styles.timezone}><strong>Time zone</strong><br />{timezone}{offset && ` (${offset})`} · 24-hour clock</p>
              {selectionError && <p className={styles.error} role="alert">{selectionError}</p>}
              <footer className={styles.footer}>
                <div className={styles.selection} aria-live="polite">
                  <Icon type="calendar" />
                  <div><span>{selectionValid ? "Your selected time" : "Choose a time to continue"}</span>
                    {selectionValid && <strong>{selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {selectedTime} · 30 min</strong>}
                  </div>
                </div>
                <button ref={continueButton} type="button" className={styles.primary} disabled={!selectionValid} onClick={() => setStep("details")}>Continue<Icon type="arrow" /></button>
              </footer>
            </>
          ) : (
            <form className={styles.details} onSubmit={handleConfirm} noValidate aria-busy={isLoading}>
              <div className={styles.sectionHeading}>
                <h3 ref={reviewHeading} tabIndex={-1}>Review your interview</h3>
                <p>Check your time and add the number we can reach you on.</p>
              </div>
              <div className={styles.review}>
                <Icon type="calendar" />
                <div><strong>{formattedDate}</strong><p>{selectedTime} · 30 minutes</p><p>{timezone} ({offset})</p><p>{roleTitle}</p><p>With {interviewerName}</p></div>
                <button type="button" className={styles.textButton} disabled={isLoading} onClick={handleBack}>Change</button>
              </div>
              <label className={styles.label} htmlFor="meeting-phone">Phone number <span>(required)</span></label>
              <input ref={phoneInput} className={styles.phoneInput} id="meeting-phone" type="tel" autoComplete="tel" inputMode="tel" required
                placeholder="e.g. +1 555 123 4567" value={phoneNumber} disabled={isLoading}
                aria-invalid={!!phoneError} aria-describedby={`meeting-phone-hint${phoneError ? " meeting-phone-error" : ""}`}
                onChange={(event) => { setPhoneNumber(event.target.value); setPhoneError(""); }} />
              <p id="meeting-phone-hint" className={styles.hint}>Include your country code so we can reach you.</p>
              {phoneError && <p id="meeting-phone-error" className={styles.error} role="alert">{phoneError}</p>}
              <div className={styles.confirmation}>
                <button type="submit" className={styles.primary} disabled={isLoading || !captchaVerified}>
                  {isLoading ? <LoadingSpinner /> : FacebookLogo && <Image className={styles.providerIcon} src={FacebookLogo} alt="" width={20} height={20} />}
                  {isLoading ? "Continuing…" : !captchaVerified ? "Verifying browser…" : "Continue with Facebook"}
                </button>
                <p className={styles.hint}>The next step uses Facebook to confirm your attendance.</p>
              </div>
              <button type="button" className={styles.textButton} disabled={isLoading} onClick={handleBack}>← Back to date &amp; time</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default MeetingScheduler;
