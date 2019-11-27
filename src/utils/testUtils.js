export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const findByClass = (component, attr) => {
  const wrapper = component.find(`.${attr}`);
  console.log(wrapper)
  return wrapper
}