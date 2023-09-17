vi.mock("react-toastify", async () => {
  const toastify = await vi.importActual<typeof import("react-toastify")>(
    "react-toastify"
  );

  return {
    ...toastify,
    toast: {
      ...toastify.toast,
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});
