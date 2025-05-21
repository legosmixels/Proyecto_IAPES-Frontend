
import FeedbackForm from '@/components/feedback/FeedbackForm';

export default function FeedbackSection() {
  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <FeedbackForm />
      </div>
    </section>
  );
}
