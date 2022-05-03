import Toast from "react-native-root-toast";
import { TailwindFn } from "twrnc";

export default function showToast(message: string, tw: TailwindFn) {
  Toast.show(message, {
    animation: true,
    opacity: 1,
    position: -90,
    containerStyle: tw`rounded-full px-5 bg-[#fff7ed] dark:bg-[#282221]`,
    textStyle: tw`font-dmsans text-orange-900 dark:text-orange-200`,
    shadowColor: "rgba(0, 0, 0, 0.3)",
  });
}
