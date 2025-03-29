"use client";

import { ConvexProvider, ConvexReactClient,Authenticated, Unauthenticated,AuthLoading } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import { Fullscreenloader } from "./full-screen-loader";
import { WelcomePage } from "./welcomepage";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return(
  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <ConvexProvider client={convex}>
        <Authenticated>
        {children}
        </Authenticated>
        <Unauthenticated>
         <div className="flex items-center justify-center min-h-screen">
          <WelcomePage/>
         </div>
        </Unauthenticated>
        <AuthLoading>
          <Fullscreenloader label="auth loading ..."/>
        </AuthLoading>
       </ConvexProvider>;
    </ConvexProviderWithClerk>
  </ClerkProvider>
  );
}
