
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground/80">
          <p><em>Last updated: March 1, 2026</em></p>
          <p>
            Welcome to Armchair Futurist ("us", "we", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following: names, email addresses, phone numbers, job titles, company names, and any other information you choose to provide.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <ul>
            <li>To send you marketing and promotional communications.</li>
            <li>To respond to your inquiries and solve any potential issues you might have with the use of our Services.</li>
            <li>To protect our Services.</li>
            <li>For other Business Purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our website, products, marketing and your experience.</li>
          </ul>

          <h2>3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>

          <h2>4. How Long Do We Keep Your Information?</h2>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
          </p>

          <h2>5. How Do We Keep Your Information Safe?</h2>
          <p>
            We aim to protect your personal information through a system of organizational and technical security measures. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <h2>6. Your Privacy Rights</h2>
          <p>
            In some regions (like the European Economic Area), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
          </p>

          <h2>7. Updates to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
          </p>

          <h2>8. How Can You Contact Us About This Policy?</h2>
          <p>
            If you have questions or comments about this policy, you may email us at armchairfuturist@gmail.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
