import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";

export const AuthComponent = () => {
  return (
    <section className="w-full h-full items-center justify-center flex px-5 md:px-7 lg:px-14 xl:px-36 z-50">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="bg-muted/85 border backdrop-blur-sm">
          <TabsTrigger value="login">Log in</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </section>
  );
};
