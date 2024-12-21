import ScrollExpand from "@/components/Expanding1";
import { FC, ReactNode } from "react";
interface pageProps {
  children :ReactNode

}

const page: FC<pageProps> = () => {
	return <div className="w-full min-h-[200vh]  flex items-center"><ScrollExpand  projectTitle="hello world ?" emphasizedText="I am new here:)" imageUrl="/yippe.gif" mainText="the thing about main text  is that it ends one day " paragraph="some text is necessary i guess "/>  </div>;
};

export default page;
