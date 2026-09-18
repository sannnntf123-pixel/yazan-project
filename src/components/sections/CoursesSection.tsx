import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { COURSES } from '@/data/courses';
import type { Course } from '@/types';

interface CoursesSectionProps {
  onLearnMore: (course: Course) => void;
  onEnroll: (courseName: string) => void;
}

export default function CoursesSection({ onLearnMore, onEnroll }: CoursesSectionProps) {
  return (
    <section id="courses" className="py-16 sm:py-24 border-t border-white/5 relative">
      <Container className="text-center space-y-12">
        
        <SectionHeading
          eyebrow="Academic Pathways"
          title="Syllabus Specialized Courses"
          description="We design structured courses mapped specifically to official exam boards. Select your curriculum track to access topic lists and syllabus outlines."
        />

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-left">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="glass-panel border border-white/10 rounded-2xl p-6 flex flex-col justify-between glass-panel-hover"
            >
              <div className="space-y-4">
                {/* Icon Circle */}
                <div className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/20 text-cyan-accent flex items-center justify-center font-bold text-lg shadow">
                  ⚡
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-accent transition-colors">
                    {course.title}
                  </h3>
                  <span className="text-[10px] font-mono text-brand-silver uppercase block tracking-wider">
                    {course.difficulty} · {course.duration}
                  </span>
                </div>

                <p className="text-xs text-brand-silver leading-relaxed line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex gap-2">
                <button
                  onClick={() => onLearnMore(course)}
                  id={`learn-more-${course.id}-btn`}
                  className="flex-1 py-2 px-3 text-xs font-display font-medium rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all text-center cursor-pointer"
                >
                  Learn More
                </button>
                
                <button
                  onClick={() => onEnroll(course.title)}
                  id={`enroll-shortcut-${course.id}-btn`}
                  className="px-3 py-2 text-xs font-display font-bold rounded-lg bg-electric-blue/15 text-cyan-accent border border-electric-blue/20 hover:bg-electric-blue hover:text-white transition-all cursor-pointer"
                  title="Direct Register"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
