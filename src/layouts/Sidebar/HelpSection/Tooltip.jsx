import React from "react";

import { Book, Keyboard, Gift, ChatEmpty } from "neetoicons";
import { values } from "ramda";

import HelpLinkSection from "./LinkSection";

const HelpSectionTooltip = ({ helpSectionProps }) => {
  const {
    documentationProps,
    keyboardShortcutProps,
    liveChatProps,
    changelogProps,
  } = helpSectionProps;

  const helpLinks = [
    documentationProps && {
      ...documentationProps,
      label: "Documentation",
      icon: Book,
      "data-testid": "help-link-documentation-button",
    },
    keyboardShortcutProps && {
      ...keyboardShortcutProps,
      label: "Keyboard shortcuts",
      icon: Keyboard,
      "data-testid": "help-link-keyboard-shortcut-button",
    },
    liveChatProps && {
      ...liveChatProps,
      label: "Chat with us",
      icon: ChatEmpty,
      "data-testid": "help-link-live-chat-button",
    },
    changelogProps && {
      ...changelogProps,
      label: "What's new?",
      icon: Gift,
      "data-testid": "help-link-changelog-button",
    },
  ].filter(Boolean);

  return <HelpLinkSection links={values(helpLinks)} />;
};

export default HelpSectionTooltip;
