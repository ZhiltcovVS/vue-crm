export default {
  mounted(el, binding) {
    const tooltipText = binding.value;
    M.Tooltip.init(el, { html: tooltipText });
  },
};
