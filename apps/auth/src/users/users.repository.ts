import { Model } from "mongoose";
import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { UserDocument } from "./models/users.schema";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
    protected readonly logger = new Logger(UsersRepository.name);

    constructor(
        @InjectModel(UserDocument.name)
        userModel: Model<UserDocument>
    ) {
        super(userModel);
    }
}
