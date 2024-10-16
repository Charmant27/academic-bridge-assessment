import { NotFoundException, Logger } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { Model, Types, FilterQuery, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;

    constructor(protected readonly model: Model<TDocument>) {}

    // create
    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId()
        })
        return (await createdDocument.save()).toJSON() as unknown as TDocument
    }

    // find one
    async findOne(filterQuery:FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery).lean<TDocument>(true)

        if (!document) {
            this.logger.warn('Document was not found', filterQuery)
            throw new NotFoundException('This document does not exist')
        }

        return document
    }

    // update
    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, updateQuery: UpdateQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(
            filterQuery, updateQuery, {
                new: true
            }
        ).lean<TDocument>(true)

        if(!document) {
            this.logger.warn('document was not found', filterQuery)
            throw new NotFoundException('This document does not exist')
        }

        return document
    }

    // find all data
    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return this.model.find(filterQuery).lean<TDocument[]>(true)
    }

    // delete
    async delete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true)
    }
}
