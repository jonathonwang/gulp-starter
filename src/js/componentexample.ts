interface ComponentData {
  testMessage: string;
}

export default {
  template: `
    <div class="mycomponent">
      {{ testMessage }}
    </div>
  `,
  data(): ComponentData {
    return {
      testMessage: 'Another Hello World'
    }
  }
};
