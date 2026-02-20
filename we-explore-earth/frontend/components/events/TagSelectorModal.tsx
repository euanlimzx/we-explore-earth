import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TagSelectorModalProps } from "@shared/types/event";
import { styles } from "./styles";

export default function TagSelectorModal({
  visible,
  fieldName,
  fieldDisplayName,
  options,
  selectedOptions,
  onSave,
  onClose,
}: TagSelectorModalProps) {
  const [tempSelections, setTempSelections] = useState<{ [option: string]: boolean }>({});

  // Initialize temp selections when modal opens
  useEffect(() => {
    if (visible) {
      setTempSelections({ ...selectedOptions });
    }
  }, [visible, selectedOptions]);

  const toggleOption = (option: string) => {
    setTempSelections((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSave = () => {
    onSave(fieldName, tempSelections);
    onClose();
  };

  const handleCancel = () => {
    setTempSelections({ ...selectedOptions });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{fieldDisplayName}</Text>

          <ScrollView style={styles.modalOptionsList}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOptionRow}
                onPress={() => toggleOption(option)}
              >
                <View
                  style={[
                    styles.modalCheckbox,
                    tempSelections[option] && styles.modalCheckboxChecked,
                  ]}
                >
                  {tempSelections[option] && (
                    <Text style={styles.modalCheckmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalButtonRow}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancel}>
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalSaveButton} onPress={handleSave}>
              <Text style={styles.modalSaveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
