const mockToastify = {
  success: vi.fn(),
  error: vi.fn(),
};

vi.mock("react-toastify", async () => {
  const toastify = await vi.importActual<typeof import("react-toastify")>(
    "react-toastify"
  );

  return {
    ...toastify,
    toast: {
      ...toastify.toast,
      success: mockToastify.success,
      error: mockToastify.error,
    },
  };
});

export default mockToastify;
