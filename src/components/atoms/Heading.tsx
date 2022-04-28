import { Text, View } from "dripsy";
import tw from "styles";
import { useDeviceContext } from "twrnc";

interface HeadingProps {
  title: string;
  subtitle?: string;
}

function Heading(props: HeadingProps) {
  useDeviceContext(tw);

  const { title, subtitle } = props;

  return (
    <View sx={tw`items-center mx-4 pt-4`}>
      <View sx={tw`w-full px-3 max-w-100`}>
        <Text
          sx={tw`font-dmsans mb-1 text-4xl md:text-center dark:text-neutral-200 font-medium`}
        >
          {title}
        </Text>

        {!!subtitle && (
          <Text sx={tw`dark:text-neutral-200 md:text-center`}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
}

export default Heading;
