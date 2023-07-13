import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import getStyles from "./styles";
import Close from "../../assets/icons/close.png";

export enum ModalTypes {
  BOTTOM_FULL = "BOTTOM_FULL",
  MIDDLE = "MIDDLE",
}

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  boxType: ModalTypes;
  boxStyles: {
    container: ViewStyle;
  };
  showCloseIcon: boolean;
  boxHeader: string;
  boxHeaderStyles?: ViewStyle;
  onClose: () => void;
  backdropOpacity?: number;
  allowScroll?: boolean;
  modalStyles?: ViewStyle;
};

const WedarModal = ({
  isVisible,
  children,
  boxType = ModalTypes.MIDDLE,
  boxStyles,
  showCloseIcon,
  boxHeader,
  boxHeaderStyles,
  onClose,
  backdropOpacity,
  allowScroll = false,
  modalStyles,
  ...props
}: ModalProps) => {
  const styles = getStyles();

  const typeStyles = {
    BOTTOM_FULL: StyleSheet.create({
      container: styles.bottomFullContainerStyle,
    }),
    MIDDLE: StyleSheet.create({
      container: styles.middleContainerStyle,
    }),
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      presentationStyle="overFullScreen"
      onSwipeComplete={onClose}
      swipeDirection="down"
      hasBackdrop={true}
      backdropOpacity={backdropOpacity ? backdropOpacity : 0.5}
      backdropTransitionOutTiming={0}
      onBackdropPress={onClose}
      style={[
        {
          flex: 1,
          margin: 0,
          flexDirection: [ModalTypes.BOTTOM_FULL].includes(boxType)
            ? "row"
            : "column",
          justifyContent: "center",
          paddingHorizontal: 0,
        },
        modalStyles,
      ]}
      coverScreen={true}
      propagateSwipe={allowScroll}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
          style={{
            flex: 1,
            margin: 0,
            flexDirection: [ModalTypes.BOTTOM_FULL].includes(boxType)
              ? "row"
              : "column",
            justifyContent: "center",
          }}
          pointerEvents="box-none"
        >
          <View
            style={[
              styles.boxContainer,
              typeStyles[boxType].container,
              boxStyles?.container,
            ]}
          >
            {showCloseIcon && (
              <View style={[styles.boxHeader, boxHeaderStyles]}>
                <TouchableOpacity style={{ width: 40 }}></TouchableOpacity>
                <Text style={styles.boxHeaderText}>{boxHeader ?? ""}</Text>
                <TouchableOpacity onPress={onClose}>
                  <Image source={Close} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
              </View>
            )}
            {children}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WedarModal;
