import i18n from "i18next";

const withRTL = (Story, context) => {
  i18n.dir = () => context.globals.addonRtl;

  return <Story />;
};

export default withRTL;
