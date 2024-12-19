import axios from "axios";
import qs from "qs";
import {
  ConfigVstepB2,
  Media,
  VstepB2Exam,
  VstepB2Listening,
  VstepB2ListeningPart,
  VstepB2Question,
  VstepB2Reading,
  VstepB2Speaking,
  VstepB2Writing,
} from "./types/vstep-b2-exam";
import { User } from "./types/user";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AssemblyAI } from "assemblyai";

export type ApiRes<D> = {
  success: boolean;
  data: D;
  error?: {
    msg: string;
  };
};

export default class ApiCaller {
  private static _caller = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  private static _genQuery(params: any): string {
    return qs.stringify(params, {
      encodeValuesOnly: true,
    });
  }

  static setHeader(key: string, value: string) {
    this._caller.defaults.headers[key] = value;
  }

  static async signIn(data: { username: string; password: string }): Promise<{
    token: string | null;
    user: User | null;
  }> {
    return this._caller
      .post("/auth/local", {
        identifier: data.username,
        password: data.password,
      })
      .then((res) => ({
        token: res?.data?.jwt,
        user: res?.data?.user,
      }))
      .catch((err) => ({
        token: null,
        user: null,
      }));
  }

  static async signUp(data: any): Promise<{
    token: string | null;
    user: User | null;
  }> {
    return this._caller
      .post("/auth/local/register", data)
      .then((res) => ({
        token: res?.data?.jwt,
        user: res?.data?.user,
      }))
      .catch((err) => ({
        token: null,
        user: null,
      }));
  }

  static async getVstepB2Exams(): Promise<VstepB2Exam[]> {
    return this._caller
      .get(
        `/vstep-b2-exams?${this._genQuery({
          populate: "*",
          filters: {
            beginDate: {
              $lte: new Date(),
            },
            endDate: {
              $gt: new Date(),
            },
          },
          pagination: {
            page: 1,
            pageSize: 100,
            withCount: true,
          },
        })}`
      )
      .then(({ data }) => {
        const { data: list } = data;
        return list.map(
          (item: any) =>
            ({
              ...item,
              id: item.documentId,
            } as VstepB2Exam)
        );
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  static async getVstepB2Exam(id: string): Promise<VstepB2Exam | null> {
    return this._caller
      .get(
        `/vstep-b2-exams/${id}?${this._genQuery({
          populate: {
            readingSection: {
              populate: "*",
            },
            listeningSection: {
              populate: {
                listenings: {
                  populate: "*",
                },
              },
            },
            writingSection: {
              populate: "*",
            },
            speakingSection: {
              populate: "*",
            },
          },
        })}`
      )
      .then(({ data }) => {
        const { data: raw } = data;
        return {
          ...raw,
          id: raw?.documentId,
          // title: raw?.Title,

          // readingSectionTimebox: raw?.ReadingSectionTimeBox,
          // listeningSectionTimebox: raw?.ListeningctionTimeBox,
          // writingSectionTimebox: raw?.WritingSectionTimeBox,
          // speakingSectionTimebox: raw?.SpeakingSectionTimeBox,

          // readingSection:
          //   raw?.ReadingSection?.map(
          //     (reading: any): VstepB2Reading => ({
          //       id: reading?.id,
          //       title: reading?.Title,
          //       content: reading?.Content,
          //       questions:
          //         reading?.Questions?.map(
          //           (ques: any): VstepB2Question => ({
          //             id: ques?.id,
          //             content: ques?.Content,
          //             a: ques?.A,
          //             b: ques?.B,
          //             c: ques?.C,
          //             d: ques?.D,
          //             result: ques?.result,
          //           })
          //         ) || [],
          //     })
          //   ) || [],
          // listeningSection:
          //   raw?.ListeningSection?.map(
          //     (listeningPart: any): VstepB2ListeningPart => ({
          //       id: listeningPart?.id,
          //       title: listeningPart?.Title,
          //       listenings:
          //         listeningPart?.Listenings?.map(
          //           (listening: any): VstepB2Listening => ({
          //             id: listening?.id,
          //             audioUrl: listening?.Audio?.url,
          //             questions:
          //               listening?.Questions?.map(
          //                 (ques: any): VstepB2Question => ({
          //                   id: ques?.id,
          //                   content: ques?.Content,
          //                   a: ques?.A,
          //                   b: ques?.B,
          //                   c: ques?.C,
          //                   d: ques?.D,
          //                   result: ques?.result,
          //                 })
          //               ) || [],
          //           })
          //         ) || [],
          //     })
          //   ) || [],
          // writingSection:
          //   raw?.WritingSection?.map(
          //     (writing: any): VstepB2Writing => ({
          //       id: writing?.id,
          //       title: writing?.Title,
          //       content: writing?.Content,
          //     })
          //   ) || [],
          // speakingSection:
          //   raw?.SpeakingSection?.map(
          //     (speaking: any): VstepB2Speaking => ({
          //       id: speaking?.id,
          //       title: speaking?.Title,
          //       content: speaking?.Content,
          //     })
          //   ) || [],
        } as VstepB2Exam;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  static async getUser(): Promise<User | null> {
    return this._caller
      .get(
        `/users/me?${this._genQuery({
          populate: {
            role: {
              populate: "*",
            },
          },
        })}`
      )
      .then(({ data }) => data as User)
      .catch((err) => null);
  }

  static async getVstepB2Config(): Promise<ConfigVstepB2> {
    return this._caller
      .get(
        `/configs?${this._genQuery({
          filters: {
            configKey: "VSTEP-B2-EXAM",
          },
          populate: {
            configValue: {
              populate: "*",
            },
          },
        })}`
      )
      .then(({ data }) => {
        const [item] = data?.data || [];
        return {
          readingTimebox: item?.configValue?.[0]?.readingTimebox,
          listeningTimebox: item?.configValue?.[0]?.listeningTimebox,
          writingTimebox: item?.configValue?.[0]?.writingTimebox,
          speakingTimebox: item?.configValue?.[0]?.speakingTimebox,
        };
      });
  }

  static async getAnalysis(promptContent: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GG_GEN_AI_API_KEY as string
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    return model.generateContent(promptContent).then((result) => {
      return result.response.text();
    });
  }

  static async transcribeAudio(audioUrl: string): Promise<string> {
    const client = new AssemblyAI({
      apiKey: process.env.NEXT_PUBLIC_ASSEMBLY_AI_API_KEY as string,
    });
    const params = {
      audio: audioUrl,
      speaker_labels: true,
    };
    const transcript = await client.transcripts.transcribe(params);

    if (transcript.status === "error") {
      return "";
    }

    return transcript.text || "";
  }

  static async getVstepB2ExamsForTeacher(): Promise<VstepB2Exam[]> {
    return this._caller
      .get(
        `/vstep-b2-exams?${this._genQuery({
          populate: "*",
          pagination: {
            page: 1,
            pageSize: 100,
            withCount: true,
          },
          sort: ["createdAt:desc"],
        })}`
      )
      .then(({ data }) => {
        const { data: list } = data;
        return list.map(
          (item: any) =>
            ({
              ...item,
              id: item.documentId,
            } as VstepB2Exam)
        );
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  static async uploadFile(formData: any): Promise<Media | null> {
    return this._caller
      .post(`/upload`, formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      })
      .then(({ data }) => {
        const [media] = data;
        return media;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  static async createExam(
    data: Partial<VstepB2Exam>
  ): Promise<VstepB2Exam | null> {
    return this._caller
      .post(`/vstep-b2-exams`, {
        data,
      })
      .then(({ data }) => {
        const { data: exam } = data;
        return exam;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  static async updateExam(
    examId: string,
    data: Partial<VstepB2Exam>
  ): Promise<VstepB2Exam | null> {
    return this._caller
      .put(`/vstep-b2-exams/${examId}`, {
        data,
      })
      .then(({ data }) => {
        const { data: exam } = data;
        return exam;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  static async deleteExam(examId: string): Promise<boolean> {
    return this._caller
      .delete(`/vstep-b2-exams/${examId}`)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  }
}
