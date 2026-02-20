import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TagsSectionProps, EventTagsSelection } from "@shared/types/event";
import { TagSelectorModal } from "./TagSelectorModal";
import { styles } from "./styles";

export function TagsSection({
  eventTagsConfig,
  tagsSelection,
  onTagsChange,
}: TagsSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  if (!eventTagsConfig) {
    return null;
  }

  const getSelectedCount = (fieldName: string): number => {
    const fieldSelections = tagsSelection[fieldName];
    if (!fieldSelections) return 0;
    return Object.values(fieldSelections).filter((v) => v === true).length;
  };

  const handleSave = (
    fieldName: string,
    selections: { [option: string]: boolean }
  ) => {
    const newSelection: EventTagsSelection = {
      ...tagsSelection,
      [fieldName]: selections,
    };
    onTagsChange(newSelection);
  };

  const fields = Object.entries(eventTagsConfig).filter(
    ([_, value]) => Array.isArray(value)
  );

  return (
    <View style={styles.tagsContainer}>
      <Text style={styles.tagsSectionTitle}>Tags</Text>
      <View style={styles.tagsButtonsContainer}>
        {fields.map(([fieldName, options]) => {
          const selectedCount = getSelectedCount(fieldName);
          const totalCount = options.length;

          return (
            <TouchableOpacity
              key={fieldName}
              style={styles.tagButton}
              onPress={() => setActiveModal(fieldName)}
            >
              <Text style={styles.tagButtonText}>{fieldName}</Text>
              <View style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>
                  {selectedCount}/{totalCount}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {fields.map(([fieldName, options]) => (
        <TagSelectorModal
          key={fieldName}
          visible={activeModal === fieldName}
          fieldName={fieldName}
          fieldDisplayName={fieldName}
          options={options}
          selectedOptions={tagsSelection[fieldName] || {}}
          onSave={handleSave}
          onClose={() => setActiveModal(null)}
        />
      ))}
    </View>
  );
}
