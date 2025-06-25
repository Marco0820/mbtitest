import { Questionnaire } from "@/components/test/Questionnaire";
import { questions } from "../questions";

export default function TestPage() {
  return (
    <main className="container mx-auto px-4">
      <Questionnaire questions={questions} />
    </main>
  );
} 