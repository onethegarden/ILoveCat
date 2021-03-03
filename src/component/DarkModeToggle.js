export default class DarkModeToggle {
  constructor({ $target }) {
    this.$target = $target;

    this.$currMode =
      window.matchMedia('(prefers-color-scheme: dark)').matches == true
        ? 'dark'
        : 'light';

    this.render();
  }

  setDarkMode() {
    document.documentElement.setAttribute('color-theme', this.$currMode);

    const checkBox = document.querySelector('.darkCheckbox');
    checkBox.checked = this.$currMode == 'dark' ? true : '';
  }

  toggleDarkMode = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('color-theme', 'dark');
    } else {
      document.documentElement.setAttribute('color-theme', 'light');
    }
  };

  render() {
    const darkDiv = document.createElement('div');
    darkDiv.className = 'darkDiv';

    const darkModeCheckBox = document.createElement('input');
    darkModeCheckBox.type = 'checkbox';
    darkModeCheckBox.className = 'darkCheckbox';

    const darkModeLabel = document.createElement('label');
    darkModeLabel.innerText = 'darkMode';
    darkModeLabel.className = 'darkModeLabel';

    darkModeLabel.appendChild(darkModeCheckBox);
    darkDiv.appendChild(darkModeLabel);
    this.$target.appendChild(darkDiv);

    darkModeCheckBox.addEventListener('click', this.toggleDarkMode);
  }
}
