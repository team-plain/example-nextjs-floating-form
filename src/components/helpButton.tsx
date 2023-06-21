import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './helpButton.module.css';
import { ChatIcon } from './icons/chatIcon';
import * as Popover from '@radix-ui/react-popover';
import { CloseIcon } from './icons/closeIcon';
import { DiscordIcon } from './icons/discordIcon';
import { BookIcon } from './icons/bookIcon';
import { ChatAltIcon } from './icons/chatAltIcon';
import { ContactForm } from './contactForm';

// Used to link to docs, discord etc. before revealing chat
function LinkRow(props: {
  label: string;
  icon: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a className={styles.linkRow} href={props.href} onClick={props.onClick}>
      <div className={styles.linkRowIcon}>{props.icon}</div>
      {props.label}
    </a>
  );
}

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && isContactFormOpen) {
      setIsContactFormOpen(false);
    }
  }, [isOpen, isContactFormOpen]);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button className={styles.helpButton}>
          {isOpen ? <CloseIcon width={24} /> : <ChatIcon width={24} />}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={clsx(styles.popoverContent, {
            [styles.popoverContentLarge]: isContactFormOpen,
          })}
          sideOffset={12}
          collisionPadding={20}
          side="top"
        >
          {isContactFormOpen ? (
            <ContactForm
              onSubmit={() => {
                setIsOpen(false);
              }}
            />
          ) : (
            <>
              <h4 className={styles.popoverTitle}>Need help?</h4>
              <p className={styles.popoverNudge}>
                Psss... Discord is great if you want a quick reply from our community!
              </p>
              <LinkRow label="Join on Discord" href="#" icon={<DiscordIcon />} />
              <LinkRow label="Documentation" href="#" icon={<BookIcon />} />
              <LinkRow
                label="Get in touch"
                href="#"
                icon={<ChatAltIcon />}
                onClick={() => {
                  setIsContactFormOpen(true);
                }}
              />
            </>
          )}

          <Popover.Arrow className={styles.popoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
