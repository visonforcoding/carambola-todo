<template>
  <div>
    <q-dialog v-model="active" @input="onInput">
      <div class="dialog-box">
        <q-input
          id="name"
          filled
          v-model="task.name"
          lazy-rules
          input-class="name"
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          filled
          v-model="task.detail"
          lazy-rules
          input-class="name"
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
        <div class="row">
          <q-chip
            removable
            dense
            v-for="tag in task.tags"
            :key="tag.id"
            :style="'background-color: '+tag.color"
            text-color="white"
            @remove="removeTaskTag($event, tag)"
          >
            {{ tag.name }}
          </q-chip>
          <q-icon
            name="add"
            style="font-size:2em;cursor:pointer"
            @click="showTagDialog = true"
          />
        </div>
        <q-card-actions align="right" class="q-pa-sm text-grey-8">
          <q-btn
            label="保存"
            @click="editTask()"
            color="indigo-5"
            class="text-capitalize"
          ></q-btn>
        </q-card-actions>
      </div>
      <q-dialog  v-model="showTagDialog" @input="onInput">
        <div v-show="showAddTag" class="dialog-box" style="width:25%">
          <q-chip
            clickable
            removable
            dense
            v-for="tag in tags"
            :key="tag.id"
            :style="'background-color: '+tag.color"
            text-color="white"
            @remove="removeTag($event, tag)"
            @click="choseTag(tag)"
            class="mb10"
          >
            {{ tag.name }}
          </q-chip>
          <div class="row mg10">
            <q-btn flat @click="showAddTag = false" label="添加标签"> </q-btn>
          </div>
        </div>
        <div class="dialog-box" style="width:25%" v-show="showAddTag == false">
          <q-input outlined v-model="tagName" label="名称" />
          <!-- <q-select v-model="tagColor" :options="colors" label="颜色" /> -->
          <div class="row mg10">
          <q-color
            v-model="tagColor"
            no-footer
            default-view="palette"
            class="my-picker"
            default-value="#33ff33"
          />
          </div>
          <div class="row mg10 justify-end">
            <div class="col offset-md-4">
              <q-btn @click="showAddTag = true" flat label="取消"></q-btn>
            </div>
            <div class="col">
              <q-btn
                rounded
                @click="addTag"
                color="orange"
                label="添加"
              ></q-btn>
            </div>
          </div>
        </div>
      </q-dialog>
    </q-dialog>
  </div>
</template>

<script>
import { getTask, editTask } from 'src/api/task'
import { addTag, fetchTags, deleteTag } from 'src/api/tags'
export default {
  name: 'TaskEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    taskId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tags: [],
      colors: [
        'primary',
        'secondary',
        'accent',
        'dark',
        'positive',
        'negative',
        'info',
        'warning'
      ],
      active: false,
      tagColor: 'primary',
      showAddTag: true,
      showTagDialog: false,
      tagName: '',
      task: {
        name: '',
        detail: '',
        tags: []
      }
    }
  },
  created () {
    this.fetchTag()
  },
  methods: {
    initTag () {
      this.tagName = ''
      this.tagColor = 'primary'
    },
    onInput (show) {
      console.log(show)
      // this.visible = false
      // this.$emit('update:visible', false)
    },
    getTheTask () {
      getTask(this.taskId).then(response => {
        if (response.code === 0) {
          this.task = response.data
        }
      })
    },
    addTag () {
      addTag({
        name: this.tagName,
        color: this.tagColor
      }).then(response => {
        this.active = false
      })
    },
    fetchTag () {
      fetchTags().then(response => {
        if (response.code === 0) {
          this.tags = response.data
        }
      })
    },
    choseTag (tag) {
      console.log(this.task.tags)
      if (!this.task.tags.includes(tag)) {
        this.task.tags.push(tag)
      }
      this.showTagDialog = false
    },
    selectTag (state) {
      if (state) {
        console.log(
          Object.keys(this.colors).filter(type => this.colors[type] === true)
        )
      }
    },
    editTask () {
      console.log(this.task)
      editTask(this.task).then(response => {
        if (response.code === 0) {
          this.active = false
        }
      })
    },
    removeTaskTag (state, tag) {
      const i = this.task.tags.indexOf(tag)
      this.task.tags.splice(i, 1)
    },
    removeTag (state, tag) {
      deleteTag(tag.id).then(response => {
        if (response.code === 0) {
          this.fetchTag()
        }
      })
    }
  },
  watch: {
    visible (value) {
      this.active = value
      if (value) {
        this.getTheTask()
      }
    },
    active (value) {
      console.log('active', value)
      this.$emit('update:visible', value)
      if (value === false) {
        this.showAddTag = true
        this.showTagDialog = false
        this.initTag()
        this.fetchTag()
      }
    }
  }
}
</script>
<style scoped>
.dialog-box {
  padding: 20px;
  width: 50%;
  /* height: 30%; */
  background-color: #ffffff;
}
.name {
  color: black;
  font-size: 30px;
  font-weight: 800;
}
</style>
