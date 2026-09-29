import { WINDOW_TYPES } from '@/lib/providers/window'
import WorkExperience from '../apps/work-experience'
import PersonalSpace from '../apps/personal-space/personal-space'

export default function WindowContent({ name }: { name: WINDOW_TYPES }) {
  switch (name) {
    case WINDOW_TYPES.WORK_EXPERIENCE:
      return <WorkExperience />
    case WINDOW_TYPES.PERSONAL_SPACE:
      return <PersonalSpace />
    default:
      return null
  }
}
