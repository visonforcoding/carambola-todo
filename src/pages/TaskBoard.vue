<template>
  <q-page class="bg-white">
    <div class="row q-mt-xs" group="columns">
      <div
        v-for="(list, index) in taskLists"
        class="col-3 q-px-xs"
        v-bind:key="index"
        :title="list.name"
      >
        <q-card class="q-pa-xs custom_bg " style="padding:0px 15px auto 10px">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm">
            <q-item-section class="text-h6 text-weight-bolder text-color">{{
              list.name
            }}</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>删除</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>重命名</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{ height: getHeight }"
            style="padding-right:15px;padding-left:10px"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="list.tasks"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="onEnd"
              @change="log"
              :move="checkMove"
              :id="list.id"
              v-bind:listid="list"
              :componentData="list"
            >
              <q-card
                v-for="task in list.tasks"
                v-bind:key="task.id"
                class="rounded-borders q-my-sm"
                @mouseover="$set(task_selected_index, 'planned', task.id)"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{
                      task.name
                    }}</span>
                    <span
                      class="float-right text-grey-8 q-mt-sm"
                      style="padding-right:12px"
                    >
                      <timeago :datetime="task.createTime" :auto-update="60">
                      </timeago>
                    </span>
                    <span
                      class="float-right"
                      style="position: absolute; width: 14px; height: 24px; right: 5px;"
                    >
                      <q-item-section
                        taskEdit
                        v-if="task.id == task_selected_index.planned"
                      >
                        <q-icon
                          size="sm"
                          name="more_vert"
                          class="cursor-pointer"
                        >
                          <q-menu transition-show="fade" transition-hide="fade">
                            <q-list style="min-width: 100px">
                              <q-item clickable>
                                <q-item-section @click="deleteTask(task.id)"
                                  >删除</q-item-section
                                >
                              </q-item>
                              <q-item clickable>
                                <q-item-section>重命名</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-icon>
                      </q-item-section>
                    </span>
                  </div>
                </q-card-section>
                <q-card-section
                  style="cursor:pointer"
                  class="q-pa-sm"
                  @click="clickTask(task.id)"
                >
                  <q-chip
                    dense
                    v-for="tag in task.tags"
                    :key="tag.id"
                    :style="'background-color: '+tag.color"
                    text-color="white"
                  >
                    {{ tag.name }}
                  </q-chip>
                  <div>
                    {{ task.detail }}
                  </div>
                </q-card-section>
              </q-card>
            </draggable>

            <q-card class="full-width" v-if="add_model.wip === index">
              <q-card-section class="q-pa-sm">
                <q-input
                  dense
                  v-model="add_data.task.name"
                  label="卡片名称"
                  outlined
                />
                <!-- <q-input dense class="q-mt-sm" v-model="add_data.wip.label" label="Label" outlined/> -->
                <q-input
                  dense
                  class="q-mt-sm"
                  v-model="add_data.task.detail"
                  label="卡片描述"
                  outlined
                />
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm text-grey-8">
                <q-btn
                  flat
                  label="取消"
                  color="primary"
                  class="text-capitalize"
                  @click="close_list_model()"
                ></q-btn>
                <q-btn
                  rounded
                  label="添加"
                  @click="addTask(list.id)"
                  color="indigo-5"
                  class="text-capitalize"
                ></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn
                icon="add"
                rounded
                flat
                label="添加卡片"
                @click="addListmodel(index)"
              />
            </q-item>
          </q-scroll-area>
        </q-card>
      </div>

      <div class="col-3 q-px-xs">
        <q-btn
          flat
          v-show="showAddBtn"
          @click="clickAddList"
          icon="playlist_add"
          color="amber"
          label="添加列表"
        ></q-btn>
        <div v-show="showAddBtn === false">
          <q-input outlined v-model="listName" />
          <div class="fit row mg10 justify-end ">
            <div class="col offset-sm-6">
              <q-btn @click="showBtnAdd" flat label="取消"></q-btn>
            </div>
            <div class="col">
              <q-btn
                rounded
                @click="addList"
                color="orange"
                label="添加"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <task-edit :visible.sync="taskEditDialog" :taskId="editTaskId" />
    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script>
import draggable from 'vuedraggable'
import { addList, myList } from 'src/api/taskList'
import { addTask, deleteTask, updateList } from 'src/api/task'
import { Task } from 'src/model/Task'
import taskEdit from './components/TaskEdit'
export default {
  name: 'TaskBoard',
  components: { draggable, taskEdit },
  data () {
    return {
      taskEditDialog: false,
      editTaskId: 0,
      showAddBtn: true,
      listName: '',
      task_selected_index: {
        blocked: null,
        completed: null,
        planned: null,
        wip: -1
      },
      tags: [{ name: '工作' }, { name: '生活' }],
      task: {
        name: '',
        detail: ''
      },
      draging: {
        taskId: 0,
        toListId: 0
      },
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      taskLists: [
        {
          id: 0,
          name: '待办(eg)',
          tasks: [
            {
              name: '吃饭(eg)',
              detail: '吃莎拉',
              createTime: new Date().toString(),
              tags: [
                {
                  name: '',
                  color: ''
                }
              ]
            }
          ]
        }
      ],
      add_model: {
        blocked: false,
        completed: false,
        planned: false,
        wip: -1
      },
      add_data: {
        blocked: {},
        completed: {},
        planned: {},
        wip: {},
        task: new Task()
      },
      size: {},
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.2
      }
    }
  },
  created () {
    this.taskEditDialog = false
    this.initTaskData()
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    getHeight () {
      return this.size.height - 90 + 'px'
    }
  },
  methods: {
    initTaskData () {
      this.listName = ''
      myList().then(response => {
        if (response.code === 0) {
          this.taskLists = response.data
        }
      })
    },
    addListmodel (index) {
      this.add_model.wip = index
    },
    close_list_model () {
      this.add_model.wip = -1
      this.add_data.task = {
        name: '',
        detail: '',
        list: {
          id: 0
        }
      }
    },
    addTask (listId) {
      console.log(this.add_data.task)
      this.add_data.task.list.id = listId
      addTask(this.add_data.task).then(response => {
        if (response.code === 0) {
          this.initTaskData()
          this.add_model.wip = -1
          this.add_data.task = new Task()
        }
      })
    },
    showBtnAdd () {
      this.showAddBtn = true
    },
    addList () {
      addList(this.listName).then(response => {
        console.log(response)
        if (response.code === 0) {
          this.showAddBtn = true
          this.initTaskData()
        }
      })
    },
    clickAddList () {
      this.showAddBtn = false
    },
    onResize (size) {
      this.size = size
    },
    deleteTask (taskId) {
      deleteTask(taskId).then(response => {
        if (response.code === 0) {
          this.initTaskData()
        }
      })
    },
    log (evt) {
      if (evt.added) {
        this.draging.taskId = evt.added.element.id
      }
      // window.console.log(evt)
    },
    checkMove (evt) {
      // console.log(evt.relatedContext.component)
      return true
    },
    onEnd (evt) {
      console.log(evt)
      this.draging.toListId = evt.to.id
      updateList(this.draging.taskId, this.draging.toListId).then(response => {
        if (response.code === 0) {
          this.initTaskData()
        }
      })
    },
    clickTask (taskId) {
      // console.log(this.$refs.taskDialog)
      // this.$refs.taskDialog.active = true
      this.editTaskId = taskId
      this.taskEditDialog = true
    },
    changeDialog (val) {
      this.$data.taskEditDialog = val
    }
  },
  watch: {
    taskEditDialog (value) {
      this.initTaskData()
    }
  }
}
</script>

<style scoped>
.custom_bg {
  background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
}

.custom_bg2 {
  background-image: linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%);
}

.custom_bg3 {
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
}

.custom_bg4 {
  background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
}

.text-color {
  color: white;
}
</style>
