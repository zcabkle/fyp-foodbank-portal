import { useUpdateEffect } from "../hooks/use-update-effect";

test('useUpdateEffect useRef is true', async () => {
  const useRef = jest.fn(true);
  useUpdateEffect()

  useUpdateEffect(() => {
    const filters = {
      name: undefined,
    };

    // Transform the filter items in an object that can be used by the parent component to call the
    // serve with the updated filters
    filterItems.forEach((filterItem) => {
      switch (filterItem.field) {
        case 'name':
          filters.name = filterItem.value;
          break;
        default:
          break;
      }
    });

    onChange?.(filters);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [filterItems]);


});