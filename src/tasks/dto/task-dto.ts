import { UserDto } from 'src/users/dto/user-dto'

export type TaskDto = {
  id: number
  name: string
  description?: string | null
  isCompleted?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
  endDateTime?: Date | null
  owner?: UserDto | null
  ownerId: number | null
}
