class LabelsList {
  static labelTemplate = "";

  constructor(labels = []) {
    this.labels = labels;
  }

  addLabel = (label) => this.labels.append(label);

  removeLabel = (labelIndex) => this.labels.splice(labelIndex, labelIndex);
}
