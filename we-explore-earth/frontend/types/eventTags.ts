// Config structure received from API (event_tags document)
export interface EventTagsConfig {
  [fieldName: string]: string[];
}

// Selection state stored in form and event document
export interface EventTagsSelection {
  [fieldName: string]: {
    [optionName: string]: boolean;
  };
}

// Props for the TagSelectorModal component
export interface TagSelectorModalProps {
  visible: boolean;
  fieldName: string;
  fieldDisplayName: string;
  options: string[];
  selectedOptions: { [option: string]: boolean };
  onSave: (fieldName: string, selections: { [option: string]: boolean }) => void;
  onClose: () => void;
}

// Props for TagsSection component
export interface TagsSectionProps {
  eventTagsConfig: EventTagsConfig | null;
  tagsSelection: EventTagsSelection;
  onTagsChange: (newSelection: EventTagsSelection) => void;
}
