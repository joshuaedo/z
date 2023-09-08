import { FC } from "react";

interface UpdatedDateProps {
  currentDate: Date;
}

const UpdatedDate: FC<UpdatedDateProps> = ({ currentDate }) => {
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedYesterday = yesterday.toLocaleDateString('en-US', options);

  return (
    <h3>These Terms of Service were last updated on {formattedYesterday}.</h3>
  );
};

const TermsOfService = () => {
  const today = new Date();
  return (
    <div id='terms-of-service' className="prose prose-stone dark:prose-invert">
      <h3>
        By accessing and using the website located at z.joshuaedo.com (referred
        to as &quot;The Z Network&quot;), you agree to comply with and be bound
        by these Terms of Service. If you do not agree to these terms, please do
        not use the Website.
      </h3>

      <h4>1. Use of the Website</h4>

      <p>
        You acknowledge and agree that your use of the Website is at your own
        risk and discretion. The Website is provided on an &quot;as is&quot; and
        &quot;as available&quot; basis without any warranties or representations
        of any kind.
      </p>

      <h4>2. User Conduct</h4>

      <p>
        You agree to use the Website only for lawful purposes and in a manner
        consistent with all applicable laws and regulations. You shall not use
        the Website to engage in any activity that is harmful, offensive, or
        infringing upon the rights of others.
      </p>

      <h4>3. Privacy Policy</h4>
      <p>
        Your use of the Website is also governed by our Privacy Policy. By using
        the Website, you consent to the collection, processing, and use of your
        information as described in the Privacy Policy.
      </p>

      <h4>4. Intellectual Property</h4>
      <p>
        The content on the Website, including but not limited to text, graphics,
        images, and logos, is protected by copyright and other intellectual
        property laws. You may not reproduce, distribute, modify, or create
        derivative works of any content from the Website without our prior
        written consent.
      </p>

      <h4>5. Links to Third-Party Websites</h4>
      <p>
        The Website may contain links to third-party websites that are not owned
        or controlled by us. We have no control over, and assume no
        responsibility for, the content, privacy policies, or practices of any
        third-party websites. You acknowledge and agree that we shall not be
        responsible or liable for any damages or losses arising from your use of
        any third-party websites.
      </p>

      <h4>6. Termination</h4>
      <p>
        We reserve the right to terminate or suspend your access to the Website
        at any time, without notice, for any reason, including, without
        limitation, breach of these Terms of Service.
      </p>

      <h4>7. Limitation of Liability</h4>
      <p>
        In no event shall we be liable for any direct, indirect, incidental,
        special, consequential, or punitive damages, or any loss of profits or
        revenues, whether incurred directly or indirectly, or any loss of data,
        use, goodwill, or other intangible losses, resulting from your use of
        the Website.
      </p>

      <h4>8. Indemnification</h4>
      <p>
        You agree to indemnify and hold us harmless from any and all claims,
        liabilities, damages, costs, and expenses, including attorneys&apos;
        fees, arising out of or in connection with your use of the Website or
        your violation of these Terms of Service.
      </p>

      <h4>9. Changes to Terms of Service</h4>
      <p>
        We may update these Terms of Service from time to time. Any changes will
        be posted on this page, and your continued use of the Website after such
        changes constitutes your acceptance of the updated terms.
      </p>

      <h4>10. Contact Us</h4>

      <p>
        If you have any questions or concerns about these Terms of Service,
        please contact us using the contact information provided on the Website.
      </p>

      <UpdatedDate currentDate={today} />
    </div>
  );
};

export default TermsOfService;
