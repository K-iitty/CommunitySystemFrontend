<template>
  <div class="owner-issue-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>问题信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="问题信息" name="ownerIssue">
          <div v-if="issueData.ownerIssue">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">问题ID:</span>
                  <span class="info-value">{{ issueData.ownerIssue.id }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">社区ID:</span>
                  <span class="info-value">{{ issueData.ownerIssue.communityId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">业主ID:</span>
                  <span class="info-value">{{ issueData.ownerIssue.ownerId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">房屋ID:</span>
                  <span class="info-value">{{ issueData.ownerIssue.houseId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">问题标题:</span>
                  <span class="info-value">{{ issueData.ownerIssue.issueTitle }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">问题内容:</span>
                  <span class="info-value">{{ issueData.ownerIssue.issueContent }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">问题类型:</span>
                  <span class="info-value">{{ issueData.ownerIssue.issueType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">子类型:</span>
                  <span class="info-value">{{ issueData.ownerIssue.subType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">位置类型:</span>
                  <span class="info-value">{{ issueData.ownerIssue.locationType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">具体位置:</span>
                  <span class="info-value">{{ issueData.ownerIssue.specificLocation }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">联系人姓名:</span>
                  <span class="info-value">{{ issueData.ownerIssue.contactName }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">联系电话:</span>
                  <span class="info-value">{{ issueData.ownerIssue.contactPhone }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">最佳联系时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.bestContactTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">紧急程度:</span>
                  <span class="info-value">{{ issueData.ownerIssue.urgencyLevel }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">预计解决时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.expectedResolveTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">分配员工ID:</span>
                  <span class="info-value">{{ issueData.ownerIssue.assignedStaffId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">分配部门ID:</span>
                  <span class="info-value">{{ issueData.ownerIssue.assignedDepartmentId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">分配时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.assignedTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">分配备注:</span>
                  <span class="info-value">{{ issueData.ownerIssue.assignedRemark }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">处理员工ID:</span>
                  <span class="info-value">{{ issueData.ownerIssue.processorStaffId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">处理计划:</span>
                  <span class="info-value">{{ issueData.ownerIssue.processPlan }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">处理结果:</span>
                  <span class="info-value">{{ issueData.ownerIssue.processResult }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">处理开始时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.processStartTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">处理结束时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.processEndTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">实际工时:</span>
                  <span class="info-value">{{ issueData.ownerIssue.actualHours }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">是否有费用:</span>
                  <span class="info-value">
                    <el-tag v-if="issueData.ownerIssue.hasCost === 1" type="success">是</el-tag>
                    <el-tag v-else type="info">否</el-tag>
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">材料费用:</span>
                  <span class="info-value">{{ issueData.ownerIssue.materialCost }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">人工费用:</span>
                  <span class="info-value">{{ issueData.ownerIssue.laborCost }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">总费用:</span>
                  <span class="info-value">{{ issueData.ownerIssue.totalCost }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">费用支付状态:</span>
                  <span class="info-value">{{ issueData.ownerIssue.costPaymentStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">问题状态:</span>
                  <span class="info-value">{{ issueData.ownerIssue.issueStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">工作状态:</span>
                  <span class="info-value">{{ issueData.ownerIssue.workStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">满意度等级:</span>
                  <span class="info-value">{{ issueData.ownerIssue.satisfactionLevel }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">满意度反馈:</span>
                  <span class="info-value">{{ issueData.ownerIssue.satisfactionFeedback }}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">问题图片:</span>
                  <div class="info-value">
                    <ImageGallery :image-data="issueData.ownerIssue.issueImages" size="default" />
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">处理图片:</span>
                  <div class="info-value">
                    <ImageGallery :image-data="issueData.ownerIssue.processImages" size="default" />
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">结果图片:</span>
                  <div class="info-value">
                    <ImageGallery :image-data="issueData.ownerIssue.resultImages" size="default" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">报告时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.reportedTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">响应时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.responseTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">预计完成时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.estimatedCompleteTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">实际完成时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.actualCompleteTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">关闭人:</span>
                  <span class="info-value">{{ issueData.ownerIssue.closedBy }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">关闭时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.closedTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">关闭原因:</span>
                  <span class="info-value">{{ issueData.ownerIssue.closeReason }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">是否已评价:</span>
                  <span class="info-value">
                    <el-tag v-if="issueData.ownerIssue.isEvaluated === 1" type="success">是</el-tag>
                    <el-tag v-else type="info">否</el-tag>
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">评价时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.evaluationTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">评价内容:</span>
                  <span class="info-value">{{ issueData.ownerIssue.evaluationContent }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">内部备注:</span>
                  <span class="info-value">{{ issueData.ownerIssue.internalRemark }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.createdAt }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">更新时间:</span>
                  <span class="info-value">{{ issueData.ownerIssue.updatedAt }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无问题信息" v-else />
        </el-tab-pane>
        
        <el-tab-pane label="问题图片" name="images">
          <div v-if="issueData.ownerIssue">
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">问题描述图片:</span>
                  <div class="info-value image-gallery-container">
                    <ImageGallery :image-data="issueData.ownerIssue.additionalImages" size="default" />
                  </div>
                  <div class="image-upload-container">
                    <el-upload
                      :action="getUploadUrl('additional-images')"
                      :headers="uploadHeaders"
                      :on-success="(response) => handleUploadSuccess(response, 'additionalImages')"
                      :on-error="handleUploadError"
                      :before-upload="beforeUpload"
                      multiple
                      :file-list="additionalImagesFileList"
                      list-type="picture-card"
                    >
                      <el-icon><Plus /></el-icon>
                      <div class="el-upload__text">点击上传问题描述图片</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">处理图片:</span>
                  <div class="info-value image-gallery-container">
                    <ImageGallery :image-data="issueData.ownerIssue.processImages" size="default" />
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">结果图片:</span>
                  <div class="info-value image-gallery-container">
                    <ImageGallery :image-data="issueData.ownerIssue.resultImages" size="default" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无问题信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="业主信息" name="owner">
          <div v-if="issueData.owner">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">业主ID:</span>
                  <span class="info-value">{{ issueData.owner.id }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">用户名:</span>
                  <span class="info-value">{{ issueData.owner.username }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">姓名:</span>
                  <span class="info-value">{{ issueData.owner.name }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">电话:</span>
                  <span class="info-value">{{ issueData.owner.phone }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">身份证号:</span>
                  <span class="info-value">{{ issueData.owner.idCard }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">性别:</span>
                  <span class="info-value">{{ issueData.owner.gender }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">出生日期:</span>
                  <span class="info-value">{{ issueData.owner.birthDate }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">业主类型:</span>
                  <span class="info-value">{{ issueData.owner.ownerType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">政治面貌:</span>
                  <span class="info-value">{{ issueData.owner.politicalStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">婚姻状况:</span>
                  <span class="info-value">{{ issueData.owner.maritalStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">民族:</span>
                  <span class="info-value">{{ issueData.owner.nationality }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">户籍类型:</span>
                  <span class="info-value">{{ issueData.owner.householdType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">户籍地址:</span>
                  <span class="info-value">{{ issueData.owner.censusRegister }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">暂住证号:</span>
                  <span class="info-value">{{ issueData.owner.temporaryResidentNo }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">当前地址:</span>
                  <span class="info-value">{{ issueData.owner.currentAddress }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">紧急联系人姓名:</span>
                  <span class="info-value">{{ issueData.owner.emergencyContactName }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">紧急联系人关系:</span>
                  <span class="info-value">{{ issueData.owner.emergencyContactRelation }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">紧急联系人电话:</span>
                  <span class="info-value">{{ issueData.owner.emergencyContactPhone }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">居住类型:</span>
                  <span class="info-value">{{ issueData.owner.residenceType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">入住日期:</span>
                  <span class="info-value">{{ issueData.owner.moveInDate }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">搬出日期:</span>
                  <span class="info-value">{{ issueData.owner.moveOutDate }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">状态:</span>
                  <span class="info-value">{{ issueData.owner.status }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">认证状态:</span>
                  <span class="info-value">{{ issueData.owner.verifyStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">备注:</span>
                  <span class="info-value">{{ issueData.owner.remark }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建时间:</span>
                  <span class="info-value">{{ issueData.owner.createdAt }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">更新时间:</span>
                  <span class="info-value">{{ issueData.owner.updatedAt }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无业主信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="房屋信息" name="house">
          <div v-if="issueData.house">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">房屋ID:</span>
                  <span class="info-value">{{ issueData.house.id }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">社区ID:</span>
                  <span class="info-value">{{ issueData.house.communityId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">楼栋ID:</span>
                  <span class="info-value">{{ issueData.house.buildingId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">房间号:</span>
                  <span class="info-value">{{ issueData.house.roomNo }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">完整房号:</span>
                  <span class="info-value">{{ issueData.house.fullRoomNo }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">房屋编码:</span>
                  <span class="info-value">{{ issueData.house.houseCode }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">建筑面积:</span>
                  <span class="info-value">{{ issueData.house.buildingArea }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">使用面积:</span>
                  <span class="info-value">{{ issueData.house.usableArea }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">公摊面积:</span>
                  <span class="info-value">{{ issueData.house.sharedArea }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">房屋类型:</span>
                  <span class="info-value">{{ issueData.house.houseType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">房屋户型:</span>
                  <span class="info-value">{{ issueData.house.houseLayout }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">房屋朝向:</span>
                  <span class="info-value">{{ issueData.house.houseOrientation }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">车位编号:</span>
                  <span class="info-value">{{ issueData.house.parkingSpaceNo }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">车位类型:</span>
                  <span class="info-value">{{ issueData.house.parkingType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">房屋状态:</span>
                  <span class="info-value">{{ issueData.house.houseStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">装修状态:</span>
                  <span class="info-value">{{ issueData.house.decorationStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">楼层:</span>
                  <span class="info-value">{{ issueData.house.floorLevel }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">是否有阳台:</span>
                  <span class="info-value">
                    <el-tag v-if="issueData.house.hasBalcony === 1" type="success">是</el-tag>
                    <el-tag v-else type="info">否</el-tag>
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">是否有花园:</span>
                  <span class="info-value">
                    <el-tag v-if="issueData.house.hasGarden === 1" type="success">是</el-tag>
                    <el-tag v-else type="info">否</el-tag>
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">备注:</span>
                  <span class="info-value">{{ issueData.house.remark }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建时间:</span>
                  <span class="info-value">{{ issueData.house.createdAt }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">更新时间:</span>
                  <span class="info-value">{{ issueData.house.updatedAt }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无房屋信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="社区信息" name="communityInfo">
          <div v-if="issueData.communityInfo">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">社区ID:</span>
                  <span class="info-value">{{ issueData.communityInfo.id }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">社区名称:</span>
                  <span class="info-value">{{ issueData.communityInfo.communityName }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">社区编码:</span>
                  <span class="info-value">{{ issueData.communityInfo.communityCode }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">省份:</span>
                  <span class="info-value">{{ issueData.communityInfo.province }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">城市:</span>
                  <span class="info-value">{{ issueData.communityInfo.city }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">区县:</span>
                  <span class="info-value">{{ issueData.communityInfo.district }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">区域编码:</span>
                  <span class="info-value">{{ issueData.communityInfo.areaCode }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">详细地址:</span>
                  <span class="info-value">{{ issueData.communityInfo.detailAddress }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">总楼栋数:</span>
                  <span class="info-value">{{ issueData.communityInfo.totalBuildings }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">总户数:</span>
                  <span class="info-value">{{ issueData.communityInfo.totalHouseholds }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">总面积:</span>
                  <span class="info-value">{{ issueData.communityInfo.totalArea }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">建筑面积:</span>
                  <span class="info-value">{{ issueData.communityInfo.buildingArea }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">停车面积:</span>
                  <span class="info-value">{{ issueData.communityInfo.parkingArea }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">绿化面积:</span>
                  <span class="info-value">{{ issueData.communityInfo.greenArea }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">公摊面积:</span>
                  <span class="info-value">{{ issueData.communityInfo.publicArea }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">物业经理ID:</span>
                  <span class="info-value">{{ issueData.communityInfo.managerStaffId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">物业经理姓名:</span>
                  <span class="info-value">{{ issueData.communityInfo.managerName }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">物业经理电话:</span>
                  <span class="info-value">{{ issueData.communityInfo.managerPhone }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">物业经理备注:</span>
                  <span class="info-value">{{ issueData.communityInfo.managerRemark }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">物业公司:</span>
                  <span class="info-value">{{ issueData.communityInfo.propertyCompany }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">联系电话:</span>
                  <span class="info-value">{{ issueData.communityInfo.contactPhone }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">建成年份:</span>
                  <span class="info-value">{{ issueData.communityInfo.builtYear }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">入住率:</span>
                  <span class="info-value">{{ issueData.communityInfo.occupancyRate }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">状态:</span>
                  <span class="info-value">{{ issueData.communityInfo.status }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">备注:</span>
                  <span class="info-value">{{ issueData.communityInfo.remark }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建时间:</span>
                  <span class="info-value">{{ issueData.communityInfo.createdAt }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">更新时间:</span>
                  <span class="info-value">{{ issueData.communityInfo.updatedAt }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无社区信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ownerIssueApi } from '@/api/ownerIssue.js'
import ImageGallery from '@/components/ImageGallery.vue'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'OwnerIssueDetail',
  components: {
    ImageGallery,
    Plus
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('ownerIssue')

    const issueData = reactive({
      ownerIssue: null,
      owner: null,
      house: null,
      communityInfo: null
    })

    // 上传相关
    const additionalImagesFileList = ref([])
    const uploadHeaders = {
      'Authorization': localStorage.getItem('token') || ''
    }
    
    // 获取上传URL
    const getUploadUrl = (type) => {
      switch (type) {
        case 'additional-images':
          return `/api/ownerIssue/${issueData.ownerIssue?.id}/additional-images`
        default:
          return ''
      }
    }
    
    // 上传成功处理
    const handleUploadSuccess = async (response, fieldName) => {
      if (response && response.data) {
        // 更新问题信息
        try {
          // 获取最新的问题信息
          const res = await ownerIssueApi.getDetailsById(issueData.ownerIssue.id)
          Object.assign(issueData, res.data)
          ElMessage.success('图片上传成功')
        } catch (error) {
          ElMessage.error('获取更新后的信息失败')
          console.error(error)
        }
      } else {
        ElMessage.error('图片上传失败')
      }
    }
    
    // 上传失败处理
    const handleUploadError = (error) => {
      ElMessage.error('图片上传失败: ' + error.message)
    }
    
    // 上传前检查
    const beforeUpload = (file) => {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2
      
      if (!isImage) {
        ElMessage.error('上传图片只能是图片格式!')
      }
      if (!isLt2M) {
        ElMessage.error('上传图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    }

    // 获取问题详情
    const fetchIssueDetail = async (issueId) => {
      try {
        const res = await ownerIssueApi.getDetailsById(issueId)
        Object.assign(issueData, res.data)
      } catch (error) {
        ElMessage.error('获取问题详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const issueId = route.params.id
      if (issueId) {
        fetchIssueDetail(issueId)
      }
    })

    return {
      activeTab,
      issueData,
      additionalImagesFileList,
      uploadHeaders,
      getUploadUrl,
      handleUploadSuccess,
      handleUploadError,
      beforeUpload,
      goBack
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.owner-issue-detail {
  padding: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-label {
  font-weight: bold;
  color: #606266;
  margin-bottom: 5px;
}

.info-value {
  flex: 1;
  color: #333;
}

.image-gallery-container {
  margin-top: 10px;
  margin-bottom: 10px;
}

.image-upload-container {
  margin-top: 10px;
}

.el-upload__text {
  margin-top: 5px;
  font-size: 12px;
  color: #606266;
}
</style>