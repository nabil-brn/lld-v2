// @flow
import React, { PureComponent } from "react";
import { Trans, withTranslation } from "react-i18next";
import type { TFunction } from "react-i18next";
import Text from "~/renderer/components/Text";
import Box from "~/renderer/components/Box";
import IconChevronRight from "~/renderer/icons/ChevronRight";
import { getDeviceModel } from "@ledgerhq/devices";
import InvertableImg from "~/renderer/components/InvertableImg";
import { DisclaimerBox } from "~/renderer/screens/onboarding/steps/SelectPIN";
import OptionRow, { IconOptionRow } from "~/renderer/components/OptionRow";
import { Inner } from "~/renderer/screens/onboarding/sharedComponents";
import RestoreNanoS from "~/renderer/images/select-pin-nano-onb.svg";
import { restoreConfiguration } from "@ledgerhq/live-common/lib/deviceWordings";

type Props = {
  t: TFunction,
};

class SelectPINrestoreNano extends PureComponent<Props, *> {
  render() {
    const { t } = this.props;

    const stepsLedgerNano = [
      {
        key: "step1",
        icon: <IconOptionRow>{"1."}</IconOptionRow>,
        desc: t("onboarding.selectPIN.restore.instructions.nano.step1", getDeviceModel("nanoS")),
      },
      {
        key: "step2",
        icon: <IconOptionRow>{"2."}</IconOptionRow>,
        desc: t("onboarding.selectPIN.restore.instructions.nano.step2"),
      },
      {
        key: "step3",
        icon: <IconOptionRow>{"3."}</IconOptionRow>,
        desc: (
          <Box style={{ display: "block" }}>
            <Trans i18nKey="onboarding.selectPIN.restore.instructions.nano.step3">
              {"Press the left button to select"}
              <Text ff="Inter|SemiBold" color="palette.text.shade100">
                {restoreConfiguration}
              </Text>
            </Trans>
          </Box>
        ),
      },
      {
        key: "step4",
        icon: <IconOptionRow>{"4."}</IconOptionRow>,
        desc: t("onboarding.selectPIN.restore.instructions.nano.step4"),
      },
      {
        key: "step5",
        icon: <IconOptionRow>{"5."}</IconOptionRow>,
        desc: t("onboarding.selectPIN.restore.instructions.nano.step5"),
      },
    ];
    const disclaimerNotes = [
      {
        key: "note1",
        icon: <IconChevronRight size={12} />,
        desc: t("onboarding.selectPIN.disclaimer.note1"),
      },
      {
        key: "note2",
        icon: <IconChevronRight size={12} />,
        desc: t("onboarding.selectPIN.disclaimer.note2"),
      },
      {
        key: "note3",
        icon: <IconChevronRight size={12} />,
        desc: t("onboarding.selectPIN.disclaimer.note3"),
      },
    ];

    return (
      <Box alignItems="center" mt={3}>
        <Inner style={{ width: 700 }}>
          <InvertableImg alt="" src={RestoreNanoS} />
          <Box shrink grow flow={4} style={{ marginLeft: 40 }}>
            {stepsLedgerNano.map(step => (
              <OptionRow key={step.key} step={step} />
            ))}
          </Box>
        </Inner>
        <DisclaimerBox mt={6} disclaimerNotes={disclaimerNotes} color="palette.text.shade80" />
      </Box>
    );
  }
}

export default withTranslation()(SelectPINrestoreNano);
