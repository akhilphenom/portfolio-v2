import { WINDOW_TYPES } from '@/lib/providers/window'
import WorkExperience from '../apps/work-experience'

export default function WindowContent({ name }: { name: WINDOW_TYPES }) {
  switch (name) {
    case WINDOW_TYPES.WORK_EXPERIENCE:
      return <WorkExperience />
    default:
      return null
  }
}
