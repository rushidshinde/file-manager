import { Form } from "@/app/_components/form";
import { List } from "@/app/_components/list";
import HeaderMenu from "@/components/header-menu";

const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <div className="min-h-screen">
        <HeaderMenu/>
        <section className="w-full py-5">
            <div className="container">
                <div className="w-full">
                    <Form />
                    <List />
                </div>
            </div>
        </section>
      <div className="max-w-6xl mx-auto p-6">
      </div>
    </div>
  );
};

export { dynamic };
export default Page;
